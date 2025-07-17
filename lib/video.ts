import axios from './axios';
import { VideoStatus } from '@/types/video';

export interface Video {
  video_id: string;
  title: string;
  status: VideoStatus;
  url?: string;
  created_at: string;
  visual_style?: string;
  language?: string;
  voice_id?: string;
}

export interface CreateVideoParams {
  script: string;
  visual_style: string;
  language: string;
  voice_id?: string;
  font_size?: string;
  text_position?: string;
  video_length: string;
  background_music_type: string;
  topic?: string;
  partial?: boolean;
}

export interface VideoProgress {
  status: string;
  url: string | null;
  video_id: string;
}

export interface TextToVideoParams {
  prompt: string;
  duration: number;
  background_music_type: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface VideoListParams {
  page?: number;
  page_size?: number;
  search?: string;
  sort_by?: string;
  status?: string;
}

export interface GenerateScriptParams {
  topic: string;
  script_type: string;
  language?: string;
  video_length?: string;
}

export interface GenerateScriptResponse {
  success: boolean;
  script: string;
  error?: string;
}

export interface VideoProgressResponse {
  uuid: string
  status: VideoStatus
  url: string | null
  title: string
  visual_style?: string
  language?: string
  created_at: string
  background_music_type?: string
  voice_id?: string
}

class VideoService {
  private static instance: VideoService;
  private constructor() {}

  static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  async listVideos(params: VideoListParams): Promise<PaginatedResponse<Video>> {
    const response = await axios.get('/api/v2/videos/', { params });
    return response.data;
  }

  async listFreeVideos(params: VideoListParams): Promise<PaginatedResponse<Video>> {
    const response = await axios.get('/api/v2/videos/free/', {
      params: {
        ...params,
        page: params.page || 1,
        page_size: params.page_size || 12,
      }
    });
    return response.data;
  }

  async getVideo(uuid: string): Promise<Video> {
    const response = await axios.get(`/api/v2/videos/${uuid}/`);
    return response.data;
  }

  async createVideo(data: Partial<Video>): Promise<Video> {
    const response = await axios.post('/api/v2/videos/', data);
    return response.data;
  }

  async updateVideo(uuid: string, data: Partial<Video>): Promise<Video> {
    const response = await axios.patch(`/api/v2/videos/${uuid}/`, data);
    return response.data;
  }

  async deleteVideo(uuid: string): Promise<void> {
    await axios.delete(`/api/v2/videos/${uuid}/`);
  }

  public async getVideoProgress(uuid: string): Promise<VideoProgressResponse> {
    try {
      const response = await axios.get(`/api/v2/videos/${uuid}/progress/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video progress:', error);
      throw error;
    }
  }

  /**
   * Create a new AI-generated video using text-to-video
   */
  public async createAIVideo(params: TextToVideoParams): Promise<Video> {
    const { data } = await axios.post<Video>('/api/text-to-video/', params);
    return data;
  }

  async renderVideo(uuid: string): Promise<{ message: string }> {
    const { data } = await axios.post(`/api/editor/${uuid}/render_video/`);
    return data;
  }

  /**
   * Generate a script for a video based on provided parameters
   */
  async generateScript(params: GenerateScriptParams): Promise<GenerateScriptResponse> {
    try {
      const response = await axios.post('/api/v2/videos/generate_script/', params);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        script: '',
        error: error.message || 'Failed to generate script'
      };
    }
  }

  async getVideoDetails(uuid: string): Promise<any> {
    const response = await axios.get(`/api/v2/videos/${uuid}/`);
    return response.data;
  }
}

export default VideoService;
