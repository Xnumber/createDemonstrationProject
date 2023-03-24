export type LoadingEvent = {
	event: string,
	message: string;
}

export interface LoadingState {
  displayEventsLonger: boolean;
  loadingQueue: LoadingEvent[];
  loading: boolean;
}