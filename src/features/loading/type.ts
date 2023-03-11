export type LoadingEvent = {
	event: string,
	message: string
}
export interface LoadingState {
  loadingQueue: LoadingEvent[];
  loading: boolean;
}