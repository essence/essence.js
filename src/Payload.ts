import Request from './Request';
import Response from './Response';



interface UpdateRequest{
	(r: Request): Request;
}

interface UpdateResponse{
	(r: Response): Response;
}

export default class Payload {

	constructor(readonly req: Request, readonly res: Response) {}

	static from(url: string) {
		return new Payload(
			new Request(url),
			new Response()
		);
	}

	withRequest(req: Request | UpdateRequest) {
		return (req instanceof Request)
			 ? new Payload(req, this.res)
			 : new Payload(req(this.req), this.res);
	}

	withResponse(res: Response | UpdateResponse) {
		return (res instanceof Response)
			? new Payload(this.req, res)
			: new Payload(this.req, res(this.res));
	}
}
