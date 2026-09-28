/**
 * Local AI Knowledge Engine for StudyPilot
 * Provides comprehensive, student-friendly explanations with examples.
 */

export const localKnowledgeBase = {
  "aws lambda": {
    topic: "AWS Lambda",
    summary: "AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources.",
    detailed: `AWS Lambda is an event-driven, serverless computing platform provided by Amazon Web Services. 

Key Takeaways:
1. **No Servers to Manage**: You just write and upload your function code (in Node.js, Python, Java, Go, etc.). AWS automatically provisions, scales, and maintains the virtual machines.
2. **Pay As You Go**: You pay only for the compute time you actually consume—down to the exact millisecond. When your function is not executing, your cost is zero.
3. **Event Triggers**: Lambda can be triggered by file uploads in Amazon S3, HTTP requests via Amazon API Gateway, records added to DynamoDB tables, or scheduled cron timers.
4. **Stateless**: Each invocation runs in a fresh, isolated container. If you need to store persistent data, use Amazon S3, DynamoDB, or an external database.

Example Scenario:
When a user uploads a high-resolution avatar to an S3 bucket, S3 automatically triggers a Lambda function that resizes the image to 200x200 pixels and saves it to a thumbnails bucket—all within 300 milliseconds!`,
    simple: `Imagine a magical kitchen chef who only appears when a customer orders a dish, cooks it instantly, and vanishes immediately. You only pay for the few seconds the chef was cooking! You don't have to pay rent for the kitchen or pay a salary while nobody is ordering.`
  },

  "amazon s3": {
    topic: "Amazon S3 (Simple Storage Service)",
    summary: "Amazon S3 is high-durability cloud object storage designed for storing files, backups, images, and website assets.",
    detailed: `Amazon Simple Storage Service (Amazon S3) is an industry-standard object storage service offering extreme scalability, security, and performance.

Key Takeaways:
1. **Object Storage**: S3 stores data as 'objects' inside 'buckets'. An object consists of the file itself, an assigned unique key (file path), and metadata.
2. **11 Nines of Durability**: S3 is engineered for 99.999999999% durability by automatically replicating files across at least three physically separate Availability Zones.
3. **Storage Classes**: Choose between S3 Standard (frequently accessed), S3 Intelligent-Tiering (automatic cost optimization), and S3 Glacier (ultra-cheap archival storage).
4. **Web Hosting**: S3 can host client-side single-page applications (HTML, CSS, JS) with high availability and global reach.`,
    simple: `Think of Amazon S3 as an infinitely huge, super-secure Google Drive or Dropbox for your code and apps. You put your files into 'buckets', and AWS guarantees your files will almost never be lost.`
  },

  "s3": {
    aliasOf: "amazon s3"
  },

  "amazon ec2": {
    topic: "Amazon EC2 (Elastic Compute Cloud)",
    summary: "Amazon EC2 provides resizable virtual server instances in the cloud with full root administrative access.",
    detailed: `Amazon EC2 allows you to rent virtual computing servers in the cloud to run any software or operating system you choose.

Key Takeaways:
1. **Virtual Machines**: You choose the operating system (Amazon Linux, Ubuntu, Windows) and hardware profile (CPU, RAM, storage, network bandwidth).
2. **Security Groups**: Act as a firewall around your EC2 instance, controlling inbound and outbound ports (e.g. allowing HTTP on port 80 and SSH on port 22).
3. **Pricing Models**: On-Demand (pay by the second), Reserved/Savings Plans (up to 72% discount for 1- or 3-year commitments), and Spot Instances (up to 90% discount on unused cloud capacity).
4. **Auto Scaling**: Automatically launch new instances when traffic spikes and terminate them when traffic subsides.`,
    simple: `Think of EC2 as renting a physical computer that lives in an Amazon data center. You can log into it, install any operating system you want, and run your backend applications 24/7.`
  },

  "ec2": {
    aliasOf: "amazon ec2"
  },

  "dynamodb": {
    topic: "Amazon DynamoDB",
    summary: "Amazon DynamoDB is a fully managed, serverless NoSQL key-value and document database offering single-digit millisecond latency.",
    detailed: `Amazon DynamoDB is built for applications that need fast, predictable database access at massive scale.

Key Takeaways:
1. **NoSQL Key-Value & Document**: Schemas are flexible; each item can contain different attributes without needing table migrations.
2. **Single-digit Millisecond Latency**: Consistently delivers sub-10ms read and write operations regardless of whether your table has 100 rows or 100 million rows.
3. **Partition & Sort Keys**: Efficient lookups use a Partition Key (HASH) and an optional Sort Key (RANGE) to organize data partitions.
4. **Zero Maintenance**: DynamoDB handles hardware provisioning, replication across three Availability Zones, software patching, and automatic horizontal scaling.`,
    simple: `Imagine a lightning-fast library catalog. As long as you know the student ID (key), the librarian hands you their file in a fraction of a blink, whether the school has 10 students or 10 million students.`
  },

  "iam": {
    topic: "AWS IAM (Identity and Access Management)",
    summary: "AWS IAM is the security backbone of AWS, controlling who can authenticate and what actions they are authorized to perform.",
    detailed: `AWS Identity and Access Management (IAM) controls authentication and authorization across all AWS services.

Key Takeaways:
1. **Principal Entities**:
   - **Users**: People or automated applications requiring long-term access.
   - **Groups**: Collections of users sharing the same permission policies.
   - **Roles**: Temporary credentials assumed by AWS services (like EC2 or Lambda) or federated users.
2. **Principle of Least Privilege**: Always grant users only the absolute minimum permissions needed to complete their task.
3. **JSON Policies**: Permissions are defined in JSON documents using Effect (Allow/Deny), Action (e.g., "s3:GetObject"), and Resource (ARN of the resource).
4. **Multi-Factor Authentication (MFA)**: Adds an essential layer of security to prevent unauthorized account access.`,
    simple: `IAM is like the building security system and digital keycards. It checks your ID badge at the door, and decides whether your keycard is allowed to open the server room or only the lobby.`
  },

  "cloud computing": {
    topic: "Cloud Computing",
    summary: "Cloud computing is the on-demand delivery of IT resources (compute, storage, databases) over the internet with pay-as-you-go pricing.",
    detailed: `Instead of buying and maintaining physical hardware in a private server room, cloud computing lets you tap into global data centers operated by providers like AWS.

Key Benefits:
1. **Trade Capital Expense for Variable Expense**: Pay only for what you consume instead of investing thousands upfront in hardware.
2. **Massive Economies of Scale**: Cloud providers operate millions of servers, translating to lower prices for individual customers.
3. **Elasticity**: Quickly scale resources up or down in seconds as user demand changes.
4. **Deploy Globally in Minutes**: Deploy applications to multiple continents with just a few clicks or lines of Infrastructure as Code.`,
    simple: `Cloud computing is like electricity from the wall outlet. You don't build your own power plant; you simply plug in your devices and pay for the exact kilowatt-hours you use each month.`
  },

  "python": {
    topic: "Python Programming",
    summary: "Python is a clean, readable, high-level language widely used in web development, data science, automation, and AI.",
    detailed: `Python emphasizes code readability and developer velocity.

Core Concepts:
1. **Syntax & Indentation**: Code blocks are structured with 4-space indentation rather than curly brackets.
2. **Data Structures**: Lists [1, 2, 3], Dictionaries {'key': 'val'}, Tuples (1, 2), and Sets {1, 2}.
3. **Functions & Modules**: Reusable logic defined with 'def function_name(args):'.
4. **Object-Oriented**: Classes with '__init__' constructors and 'self' reference.
5. **Ecosystem**: Vast libraries for web development (FastAPI, Django), machine learning (PyTorch, TensorFlow), and cloud scripting (Boto3).`,
    simple: `Python is designed to read almost like normal English. It removes ugly clutter like semicolons and curly brackets, making it the friendliest language for beginners and pros alike.`
  },

  "html": {
    topic: "HTML (HyperText Markup Language)",
    summary: "HTML is the standard markup language used to structure web pages and applications.",
    detailed: `HTML provides the structural skeleton of every webpage.

Key Takeaways:
1. **Semantic Elements**: Tags like <header>, <nav>, <main>, <article>, and <footer> convey meaning to browsers, search engines, and screen readers.
2. **Document Structure**: Starts with <!DOCTYPE html>, followed by <html>, <head> (metadata, titles, stylesheets), and <body> (visible content).
3. **Forms & Controls**: <form>, <input>, <button>, <select> allow user data collection.
4. **Accessibility (a11y)**: Using proper alt text for images, aria-labels, and semantic tags makes web applications accessible to people with disabilities.`,
    simple: `HTML is the structural skeleton of a house. It defines where the walls, doors, windows, and rooms go before you paint them (CSS) or turn on the electricity and plumbing (JavaScript).`
  },

  "css": {
    topic: "CSS (Cascading Style Sheets)",
    summary: "CSS controls the visual presentation, styling, layout, typography, and responsive animations of web pages.",
    detailed: `CSS brings visual design to life.

Key Takeaways:
1. **Box Model**: Content -> Padding -> Border -> Margin.
2. **Flexbox**: 1-dimensional layout engine for aligning items along a row or column with space distribution.
3. **CSS Grid**: 2-dimensional layout engine for creating complex rows and columns.
4. **Responsive Media Queries**: @media (min-width: 768px) adapts UI styling across smartphones, tablets, and desktop displays.
5. **Variables**: Custom properties (--accent-color: #38bdf8) maintain consistent theme palettes.`,
    simple: `If HTML is the bare walls of a house, CSS is the interior design: the paint colors, furniture layout, beautiful lighting, and wallpapers that make it pleasant to live in.`
  },

  "javascript": {
    topic: "JavaScript",
    summary: "JavaScript is the core programming language of the web, enabling interactivity, dynamic UI rendering, and full-stack servers.",
    detailed: `JavaScript runs inside every modern web browser and server-side via Node.js.

Key Takeaways:
1. **Modern ES6+ Syntax**: 'let' and 'const' for block scope, arrow functions () => {}, and template literals \`Hello \${name}\`.
2. **Asynchronous Architecture**: Promises and 'async/await' for non-blocking network calls and background tasks.
3. **DOM Manipulation**: Querying and updating HTML elements in real time based on user clicks and keyboard inputs.
4. **Full-Stack Capability**: Powering frontend frameworks (React, Vue) and backend runtimes (Node.js, Express).`,
    simple: `JavaScript gives a website a brain and muscles. It's the engine that responds when you click a button, plays an animation, checks your answers in a quiz, or fetches new messages without reloading the page.`
  },

  "java": {
    topic: "Java Programming",
    summary: "Java is an enterprise-grade, statically typed, class-based object-oriented programming language running on the JVM.",
    detailed: `Java is one of the world's most widely adopted programming languages, powering major enterprise backends, Android apps, and high-performance financial systems.

Key Takeaways:
1. **Write Once, Run Anywhere (WORA)**: Java code compiles into platform-independent bytecode (.class), executed by the Java Virtual Machine (JVM).
2. **Strong Typing & OOP**: Everything is inside a class, with strict typing, encapsulation, inheritance ('extends'), and polymorphism ('implements').
3. **Memory Management**: Automatic Garbage Collection frees unreferenced heap objects, preventing dangerous memory leaks.
4. **Robust Exception Handling**: Checked and unchecked exceptions managed via try-catch-finally blocks ensure system stability.`,
    simple: `Java is like an industrial steel skyscraper. It has strict building rules and strong blueprints (types and classes), ensuring that large, mission-critical systems don't collapse when handling millions of users.`
  }
};

/**
 * Searches the local knowledge base with keyword matching and semantic heuristics.
 */
export function queryLocalKnowledge(question, topicContext, isSimpler = false) {
  const qLower = (question || "").toLowerCase();
  const tLower = (topicContext || "").toLowerCase();
  const combined = `${qLower} ${tLower}`;

  let matchedKey = null;

  for (const key of Object.keys(localKnowledgeBase)) {
    if (combined.includes(key)) {
      matchedKey = key;
      break;
    }
  }

  // Check aliases
  if (matchedKey && localKnowledgeBase[matchedKey].aliasOf) {
    matchedKey = localKnowledgeBase[matchedKey].aliasOf;
  }

  // Secondary search by individual keywords
  if (!matchedKey) {
    if (combined.includes("lambda") || combined.includes("serverless")) matchedKey = "aws lambda";
    else if (combined.includes("s3") || combined.includes("bucket") || combined.includes("object storage")) matchedKey = "amazon s3";
    else if (combined.includes("ec2") || combined.includes("virtual machine") || combined.includes("instance")) matchedKey = "amazon ec2";
    else if (combined.includes("dynamo") || combined.includes("nosql")) matchedKey = "dynamodb";
    else if (combined.includes("iam") || combined.includes("role") || combined.includes("permission")) matchedKey = "iam";
    else if (combined.includes("cloud") || combined.includes("aws")) matchedKey = "cloud computing";
    else if (combined.includes("python") || combined.includes("list") || combined.includes("dict") || combined.includes("def ")) matchedKey = "python";
    else if (combined.includes("html") || combined.includes("tag") || combined.includes("semantic")) matchedKey = "html";
    else if (combined.includes("css") || combined.includes("flexbox") || combined.includes("style")) matchedKey = "css";
    else if (combined.includes("javascript") || combined.includes("js") || combined.includes("async") || combined.includes("promise")) matchedKey = "javascript";
    else if (combined.includes("java") || combined.includes("jvm") || combined.includes("oop") || combined.includes("class")) matchedKey = "java";
  }

  if (matchedKey && localKnowledgeBase[matchedKey]) {
    const entry = localKnowledgeBase[matchedKey];
    if (isSimpler || qLower.includes("simple") || qLower.includes("explain simpler") || qLower.includes("eli5")) {
      return `Here is a simpler, intuitive way to understand **${entry.topic}**:\n\n${entry.simple}\n\n💡 *Tip: Ready to test what you learned? Jump into the practice quiz or ask for a specific code example!*`;
    }
    return `### ${entry.topic}\n\n${entry.summary}\n\n${entry.detailed}\n\n💬 *Want a simpler analogy? Click "Explain simpler" or ask for a step-by-step code walkthrough!*`;
  }

  return "I don't have a detailed lesson for that topic yet. Try asking about one of the available StudyPilot topics like AWS Lambda, S3, EC2, DynamoDB, IAM, Cloud Computing, Python, Java, HTML, CSS, or JavaScript!";
}
