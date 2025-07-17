import { useState, useRef } from "react"

// Types
export interface Video {
  uuid: string
  status: string
  title: string
  created_at: string
  url: string | null
}

export interface VoiceOption {
  id: string
  name: string
  description: string
  premium: boolean
  sampleUrl: string
}

export interface FontStyle {
  name: string
  premium: boolean
  image: string
}

export interface MusicOption {
  name: string
  label: string
  description: string
  premium: boolean
  file: string
}

// Sample data
export const voiceOptions: VoiceOption[] = [
  { id: 'en-US-Neural2-D', name: 'David', description: 'Male US English neural voice', premium: false, sampleUrl: '' },
  { id: 'en-US-Neural2-J', name: 'James', description: 'Male US English neural voice', premium: false, sampleUrl: '' },
]

export const fontStyles: FontStyle[] = [
  { name: 'default', premium: false, image: 'default.png' },
  { name: 'base-monster', premium: true, image: 'monster.png' },
]

export const musicOptions: MusicOption[] = [
  { name: 'default', label: 'Default', description: 'Default background music', premium: false, file: 'default.mp3' },
  { name: 'none', label: 'No Music', description: 'No background music', premium: true, file: '' },
]

export function useVideoCreator() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [videoLength, setVideoLength] = useState("60")
  const [selectedVoice, setSelectedVoice] = useState("en-US-Neural2-D")
  const [topic, setTopic] = useState("")
  const [generatingScript, setGeneratingScript] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const [selectedVisualStyle, setSelectedVisualStyle] = useState("Photo Realism")
  const [showErrors, setShowErrors] = useState(false)
  const [scriptTooLong, setScriptTooLong] = useState(false)
  const [currentlyPlayingVoiceId, setCurrentlyPlayingVoiceId] = useState<string | null>(null)
  const [tabs] = useState(["Language", "Script", "Video Settings", "Advanced Settings", "Font Settings", "Generate"])
  const [currentTab, setCurrentTab] = useState("Language")
  const [selectedFont, setSelectedFont] = useState("default")
  const [fontSize, setFontSize] = useState("large")
  const [selectedTextPosition, setSelectedTextPosition] = useState("center")
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [showWatermark, setShowWatermark] = useState(true)
  const [backgroundMusicType, setBackgroundMusicType] = useState("default")
  const [currentlyPlayingMusic, setCurrentlyPlayingMusic] = useState<string | null>(null)
  const [generatingVideo, setGeneratingVideo] = useState(false)
  const audioPlayerRef = useRef<HTMLAudioElement>(null)

  const canProceed = (userIsPremium: boolean) => {
    switch (currentTab) {
      case "Language":
        return !!selectedLanguage
      case "Script":
        const topicOK = userIsPremium ? true : !!topic
        const scriptOK = !!generatedScript && generatedScript.length <= (videoLength === '90' ? 2000 : 1500)
        const topicLengthOK = !topic || topic.length <= 1000
        return topicOK && scriptOK && topicLengthOK
      case "Video Settings":
        return !!selectedVisualStyle
      case "Font Settings":
        return !!selectedFont && !!fontSize && !!selectedTextPosition
      case "Generate":
      default:
        return true
    }
  }

  const generateScript = async (userIsPremium: boolean) => {
    if (!userIsPremium && !topic) {
      setShowErrors(true)
      return
    }

    if (topic === "Test Script") {
      setGeneratedScript("This is a test script for demonstration...")
      setGeneratingScript(false)
      return
    }

    if (!topic) {
      setShowErrors(true)
      return
    }

    setGeneratingScript(true)
    try {
      const res = await fetch("/api/videos/generate-script/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script_type: "educational",
          topic,
          language: selectedLanguage,
          video_length: videoLength,
        }),
      })
      const data = await res.json()
      setGeneratedScript(data.script || "")
      setGeneratingScript(false)
      const maxLength = videoLength === "90" ? 2000 : 1500
      setScriptTooLong((data.script || "").length > maxLength)
    } catch (error) {
      console.error("Error:", error)
      setGeneratingScript(false)
      alert("Failed to generate script. Please try again.")
    }
  }

  const generateVideo = async (partialVideo: boolean, onSuccess: (newVideo: Video) => void) => {
    setGeneratingVideo(true)

    let finalTopic = topic
    if (!finalTopic || finalTopic.trim() === "") {
      finalTopic = "Untitled Video"
    }

    const body = {
      language: selectedLanguage,
      script: generatedScript,
      script_type: "educational",
      topic: finalTopic,
      visual_style: selectedVisualStyle,
      playback_speed: 1.2,
      voice_id: selectedVoice,
      font_style: selectedFont,
      font_size: fontSize,
      text_position: selectedTextPosition,
      video_length: videoLength,
      show_subtitles: true,
      background_music_type: backgroundMusicType,
      partial: partialVideo || false,
    }

    try {
      const res = await fetch("/api/videos/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setGeneratingVideo(false)

      if (data.success) {
        const newVideo = {
          uuid: data.video_id,
          status: "IN_PROGRESS",
          title: finalTopic,
          created_at: new Date().toISOString(),
          url: null,
        }
        onSuccess(newVideo)
        resetForm()
      } else if (data.error) {
        alert("Error: " + JSON.stringify(data.error))
      }
    } catch (error) {
      console.error("Error generating video:", error)
      setGeneratingVideo(false)
      alert("An error occurred while generating the video.")
    }
  }

  const resetForm = () => {
    setSelectedLanguage("en")
    setTopic("")
    setGeneratedScript("")
    setSelectedVisualStyle("")
    setCurrentTab("Language")
    setShowErrors(false)
  }

  const playVoiceSample = async (voiceId: string) => {
    const audioPlayer = audioPlayerRef.current
    if (!audioPlayer) return

    const voice = voiceOptions.find((v) => v.id === voiceId)
    if (!voice || !voice.sampleUrl) return

    if (currentlyPlayingVoiceId === voiceId) {
      stopAudio()
      return
    }

    stopAudio()
    setCurrentlyPlayingVoiceId(voiceId)
    try {
      audioPlayer.src = voice.sampleUrl
      await audioPlayer.play()
      audioPlayer.onended = () => {
        setCurrentlyPlayingVoiceId(null)
      }
    } catch (err) {
      console.error("Error playing voice sample:", err)
      setCurrentlyPlayingVoiceId(null)
    }
  }

  const stopAudio = () => {
    const audioPlayer = audioPlayerRef.current
    if (audioPlayer) {
      audioPlayer.pause()
      audioPlayer.currentTime = 0
    }
    setCurrentlyPlayingVoiceId(null)
  }

  const playMusicSample = (musicType: string) => {
    const audioPlayer = audioPlayerRef.current
    if (!audioPlayer) return

    const music = musicOptions.find((m) => m.name === musicType)
    if (!music || !music.file) return

    if (currentlyPlayingMusic === musicType) {
      audioPlayer.pause()
      audioPlayer.currentTime = 0
      setCurrentlyPlayingMusic(null)
      return
    }

    audioPlayer.pause()
    audioPlayer.currentTime = 0

    audioPlayer.src = `/static/audio_samples/bg-music/${music.file}`
    audioPlayer.play()
      .then(() => {
        setCurrentlyPlayingMusic(musicType)
        audioPlayer.onended = () => {
          setCurrentlyPlayingMusic(null)
        }
      })
      .catch((err) => console.error("Error playing music sample:", err))
  }

  const toggleWatermark = (userIsPremium: boolean) => {
    if (!userIsPremium) return
    setShowWatermark(!showWatermark)
  }

  const selectFont = (fontName: string, userIsPremium: boolean) => {
    if (!userIsPremium && fontName !== "default") return
    setSelectedFont(fontName)
  }

  const previousFontClick = () => {
    if (currentFontIndex > 0) {
      setCurrentFontIndex(currentFontIndex - 1)
    }
  }

  const nextFontClick = () => {
    if (currentFontIndex < fontStyles.length - 1) {
      setCurrentFontIndex(currentFontIndex + 1)
    }
  }

  const nextTab = (userIsPremium: boolean) => {
    if (canProceed(userIsPremium)) {
      const idx = tabs.indexOf(currentTab)
      if (idx < tabs.length - 1) {
        setCurrentTab(tabs[idx + 1])
        setShowErrors(false)
      }
    } else {
      setShowErrors(true)
      if (currentTab === "Script" && generatedScript.length > 1500) {
        setScriptTooLong(true)
      }
    }
  }

  const previousTab = () => {
    const idx = tabs.indexOf(currentTab)
    if (idx > 0) {
      setCurrentTab(tabs[idx - 1])
      setShowErrors(false)
    }
  }

  return {
    // State
    selectedLanguage,
    videoLength,
    selectedVoice,
    topic,
    generatingScript,
    generatedScript,
    selectedVisualStyle,
    showErrors,
    scriptTooLong,
    currentlyPlayingVoiceId,
    tabs,
    currentTab,
    selectedFont,
    fontSize,
    selectedTextPosition,
    currentFontIndex,
    showWatermark,
    backgroundMusicType,
    currentlyPlayingMusic,
    generatingVideo,
    audioPlayerRef,

    // Setters
    setSelectedLanguage,
    setVideoLength,
    setSelectedVoice,
    setTopic,
    setGeneratedScript,
    setSelectedVisualStyle,
    setShowErrors,
    setCurrentTab,
    setSelectedFont,
    setFontSize,
    setSelectedTextPosition,
    setCurrentFontIndex,
    setShowWatermark,
    setBackgroundMusicType,
    setCurrentlyPlayingMusic,

    // Methods
    canProceed,
    generateScript,
    generateVideo,
    playVoiceSample,
    playMusicSample,
    toggleWatermark,
    selectFont,
    previousFontClick,
    nextFontClick,
    nextTab,
    previousTab,
  }
} 