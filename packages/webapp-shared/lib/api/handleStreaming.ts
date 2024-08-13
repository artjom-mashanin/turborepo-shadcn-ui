import { createParser, type ParsedEvent, type ReconnectInterval } from 'eventsource-parser';

type HandleStreamingParams = {
  response: Response;
  onEvent: (event: ParsedEvent) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
};

export const handleStreaming = async ({ response, onEvent, onDone, onError }: HandleStreamingParams) => {
  try {
    const reader = response.body!.getReader();

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === 'event') {
        console.log('Received event:', event);
        onEvent(event);
      } else if (event.type === 'reconnect-interval') {
        console.log('We should set reconnect interval to %d milliseconds', event.value);
      }
    };

    const parser = createParser(onParse);
    let { done, value } = await reader.read();

    while (!done) {
      if (value) {
        const text = new TextDecoder().decode(value);
        parser.feed(text);
      }
      ({ done, value } = await reader.read());
    }

    if (onDone) onDone();
  } catch (error) {
    console.error('Error initiating SSE:', error);

    if (onError) onError(error as Error);
  }
};
