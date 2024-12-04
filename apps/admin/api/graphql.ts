import data from '../graphql/fixtures/root';

export const config = {
  runtime: 'edge',
};

export async function GET(): Promise<Response> {
  // This encoder will stream your text
  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    start(controller) {
      // Start encoding imported data as JSON,
      // and add the resulting stream to the queue
      controller.enqueue(encoder.encode(JSON.stringify(data, null, 2)));
      // Prevent anything else being added to the stream
      controller.close();
    },
  });

  return new Response(customReadable, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
