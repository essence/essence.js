import Payload from './payload';
import Middleware from './middleware';



// Creates a condition that will execute the given middleware
// if the filter returns true.
export default function condition<T>(
	filter: (T) => boolean,
	middleware: Middleware<T>
): Middleware<T> {
	return async (payload) =>
		filter(payload)
			? await middleware(payload)
			: payload;
};
