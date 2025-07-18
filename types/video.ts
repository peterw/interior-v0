export type VideoStatus =
  | 'IN_PROGRESS'
  | 'GENERATING_METADATA'
  | 'METADATA_GENERATED'
  | 'RENDERING'
  | 'COMPLETED'
  | 'FINISHED'
  | 'ERROR'
  | 'ERROR_TEXT_GENERATION'
  | 'ERROR_AUDIO_GENERATION'
  | 'ERROR_IMAGE_GENERATION'
  | 'ERROR_INVALID_FRONTEND_INPUT'
  | 'ERROR_LAMBDA_EXECUTION_FAILED'
  | 'ERROR_SCRIPT_READY_LAMBDA_FAILED'

// Processing statuses from filters.py
export const PROCESSING_STATUSES: VideoStatus[] = [
  'GENERATING_METADATA',
  'METADATA_GENERATED',
  'RENDERING'
]

// Terminal statuses that should stop polling
export const TERMINAL_STATUSES: VideoStatus[] = [
  'COMPLETED',
  'FINISHED',
  'ERROR',
  'ERROR_TEXT_GENERATION',
  'ERROR_AUDIO_GENERATION',
  'ERROR_IMAGE_GENERATION',
  'ERROR_INVALID_FRONTEND_INPUT',
  'ERROR_LAMBDA_EXECUTION_FAILED',
  'ERROR_SCRIPT_READY_LAMBDA_FAILED'
]

// Error statuses for styling
export const ERROR_STATUSES: VideoStatus[] = [
  'ERROR',
  'ERROR_TEXT_GENERATION',
  'ERROR_AUDIO_GENERATION',
  'ERROR_IMAGE_GENERATION',
  'ERROR_INVALID_FRONTEND_INPUT',
  'ERROR_LAMBDA_EXECUTION_FAILED',
  'ERROR_SCRIPT_READY_LAMBDA_FAILED'
]

export interface Video {
  video_id: string
  title: string
  status: VideoStatus
  url?: string
  created_at: string
}
