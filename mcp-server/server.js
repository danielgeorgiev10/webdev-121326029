
const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

const tools = [
  {
    name: 'find_lecture',
    description:
    'Use this tool whenever the user asks about a specific lecture, including its title, topics, content, or what is covered. The user must provide a lecture number from 1 to 12. Returns the lecture title and topics.',
    inputSchema: {
      type: 'object',
      properties: {
        number: {
          type: 'integer',
          description: 'Lecture number, 1 to 12',
        },
      },
      required: ['number'],
    },
  },
  {
    name: 'list_lectures',
    description:
      'List the number and title of every course lecture. Use it when asked what the course covers.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

rl.on('line', (line) => {
  console.error(`got: ${line}`);

  try {
    const message = JSON.parse(line);

    // Initialize handshake
    if (message.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          protocolVersion: message.params.protocolVersion,
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'lectures',
            version: '0.1.0',
          },
        },
      };

      process.stdout.write(JSON.stringify(response) + '\n');
    }

    // List available tools
    else if (message.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          tools: tools,
        },
      };

      process.stdout.write(JSON.stringify(response) + '\n');
    }

    // Execute a tool
    else if (message.method === 'tools/call') {
      const toolName = message.params.name;

      // Unknown tool
      if (!tools.some((tool) => tool.name === toolName)) {
        const response = {
          jsonrpc: '2.0',
          id: message.id,
          error: {
            code: -32602,
            message: `Unknown tool: ${toolName}`,
          },
        };

        process.stdout.write(JSON.stringify(response) + '\n');
      } else {
        const lecturesPath = path.join(__dirname, 'lectures.json');
        const lectures = JSON.parse(
          fs.readFileSync(lecturesPath, 'utf8')
        );

        let text;
        let isError = false;

        // Find one lecture
        if (toolName === 'find_lecture') {
          const number = message.params.arguments.number;

          const lecture = lectures.find(
            (lecture) => lecture.number === number
          );

          if (!lecture) {
            text = `Lecture ${number} was not found. Please try another lecture number.`;
            isError = true;
          } else {
            const topics = Array.isArray(lecture.topics)
              ? lecture.topics.join(', ')
              : lecture.topics;

            text = `Lecture ${lecture.number}: ${lecture.title}. Topics: ${topics}`;
          }
        }

        // List all lectures
        else if (toolName === 'list_lectures') {
          text = lectures
            .map(
              (lecture) =>
                `Lecture ${lecture.number}: ${lecture.title}`
            )
            .join('\n');
        }

        const response = {
          jsonrpc: '2.0',
          id: message.id,
          result: {
            content: [
              {
                type: 'text',
                text: text,
              },
            ],
            isError: isError,
          },
        };

        process.stdout.write(JSON.stringify(response) + '\n');
      }
    }

    // Unknown method
    else if (message.id !== undefined) {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        error: {
          code: -32601,
          message: `Unknown method: ${message.method}`,
        },
      };

      process.stdout.write(JSON.stringify(response) + '\n');
    }

    // notifications/initialized gets no response

  } catch (error) {
    console.error('Server error:', error.message);
  }
});
