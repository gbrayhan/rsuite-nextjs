export interface GenericState<T> {
    data: T
    status: 'loading' | 'finished' | 'error'
    error: string;
}



