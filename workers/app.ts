import {
  createRequestHandler,
  handleAsset,
} from "virtual:react-router/fetch-handler";
import * as build from "virtual:react-router/server-build";

const handleRequest = createRequestHandler(build);

export default {
  async fetch(
    request: Request,
    env: { ASSETS: Fetcher; [key: string]: unknown },
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const assetResponse = await handleAsset(request, env, ctx);
      if (assetResponse) {
        return assetResponse;
      }

      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      return new Response(errorMessage, { status: 500 });
    }
  },
};

