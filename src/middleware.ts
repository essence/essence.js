import Payload from './Payload';



export default interface Middleware<T> {
	(value: T): Promise<T>;
}
