/**
 * Comprehensive Subject and Topic Seed Data for StudyPilot
 * Includes AWS Cloud, Python, Java, and Web Development.
 */

export const seedSubjects = [
  {
    id: "aws-cloud",
    title: "AWS Cloud",
    icon: "Cloud",
    tagline: "Master modern cloud architecture, serverless computing, and scalable infrastructure.",
    category: "Cloud Computing",
    level: "Beginner to Advanced",
    topicsCount: 6,
    color: "from-amber-500 to-orange-600",
    topics: [
      {
        id: "cloud-computing",
        subjectId: "aws-cloud",
        title: "Cloud Computing",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Core concepts of on-demand computing, deployment models, and cloud benefits.",
        explanation: "Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, organizations can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider like Amazon Web Services (AWS). Key characteristics include high availability, elastic scalability, fault tolerance, and global reach.",
        keyPoints: [
          "Pay-as-you-go pricing minimizes capital expenditure (CapEx) in favor of operational expenditure (OpEx).",
          "Elasticity enables services to automatically scale up or down based on actual traffic.",
          "Three primary cloud models: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service).",
          "AWS operates across global Regions, Availability Zones (AZs), and edge locations."
        ],
        examples: `// Concept comparison:
Traditional IT: Buy server hardware ($10,000) -> Wait 4 weeks -> Rack and power -> Pay ongoing cooling and admin costs.
Cloud Model: Request EC2 or Lambda on AWS console/CLI -> Provisioned in 30 seconds -> Pay only for CPU seconds used.`,
        quiz: [
          {
            id: "aws-cc-q1",
            question: "Which of the following describes the key financial benefit of cloud computing?",
            options: [
              "Trades variable operational expense for massive fixed capital investment",
              "Trades upfront capital expense (CapEx) for low variable operational expense (OpEx)",
              "Guarantees that hardware never experiences physical failure",
              "Eliminates the need for software engineering teams"
            ],
            correctAnswer: 1,
            explanation: "Cloud computing allows businesses to trade massive upfront capital hardware expenses (CapEx) for flexible, pay-as-you-go operating expenses (OpEx)."
          },
          {
            id: "aws-cc-q2",
            question: "What is an AWS Region composed of?",
            options: [
              "A single massive building located in Northern Virginia",
              "Multiple physically separated and isolated Availability Zones connected through low-latency links",
              "A virtual private network shared across all cloud providers",
              "A cluster of client browser sessions"
            ],
            correctAnswer: 1,
            explanation: "An AWS Region consists of multiple isolated and physically separated Availability Zones (AZs) within a geographic area."
          }
        ]
      },
      {
        id: "ec2",
        subjectId: "aws-cloud",
        title: "EC2 (Elastic Compute Cloud)",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "Virtual server hosting in the cloud with complete control over OS and compute specs.",
        explanation: "Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the AWS Cloud. Using Amazon EC2 eliminates the need to invest in hardware up front, so you can develop and deploy applications faster. You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage.",
        keyPoints: [
          "Virtual machine instances running your choice of OS (Amazon Linux, Ubuntu, Windows Server, etc.).",
          "Instance types optimized for Compute (C), Memory (R), Storage (I), or General Purpose (T/M).",
          "Security Groups act as virtual firewalls controlling inbound and outbound network traffic.",
          "Auto Scaling Groups automatically adjust instance count in response to load alarms."
        ],
        examples: `# Launching an EC2 instance with AWS CLI:
aws ec2 run-instances \\
    --image-id ami-0c55b159cbfafe1f0 \\
    --count 1 \\
    --instance-type t3.micro \\
    --key-name MyDevKeyPair \\
    --security-group-ids sg-903004f8 \\
    --subnet-id subnet-6e7f829e`,
        quiz: [
          {
            id: "aws-ec2-q1",
            question: "What component acts as a virtual firewall for your Amazon EC2 instance to control incoming and outgoing traffic?",
            options: [
              "Network Address Translator (NAT)",
              "Security Group",
              "Identity and Access Management (IAM) Policy",
              "Route Table"
            ],
            correctAnswer: 1,
            explanation: "Security Groups act as virtual firewalls at the instance level to control inbound and outbound network traffic."
          },
          {
            id: "aws-ec2-q2",
            question: "Which EC2 purchasing option provides the highest discount for steady-state workloads in exchange for a 1- or 3-year commitment?",
            options: [
              "On-Demand Instances",
              "Spot Instances",
              "Reserved Instances / Savings Plans",
              "Dedicated Hosts"
            ],
            correctAnswer: 2,
            explanation: "Reserved Instances and Savings Plans provide significant discounts (up to 72%) compared to On-Demand pricing in return for a 1- or 3-year term commitment."
          }
        ]
      },
      {
        id: "s3",
        subjectId: "aws-cloud",
        title: "S3 (Simple Storage Service)",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Industry-leading object storage built to retrieve any amount of data from anywhere.",
        explanation: "Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can store and protect any amount of data for virtual machine images, website assets, mobile apps, enterprise applications, and IoT devices.",
        keyPoints: [
          "Data is stored as objects inside buckets; each object consists of data, a key (name), and metadata.",
          "Designed for 99.999999999% (11 9's) of durability by redundantly storing objects across multiple AZs.",
          "Storage classes include S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA, and S3 Glacier.",
          "Supports static website hosting, lifecycle management policies, and bucket policies for access control."
        ],
        examples: `// Uploading an object to S3 using AWS SDK v3 in Node.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });
const upload = await client.send(
  new PutObjectCommand({
    Bucket: "studypilot-assets",
    Key: "notes/cloud-intro.pdf",
    Body: fileStream,
    ContentType: "application/pdf"
  })
);`,
        quiz: [
          {
            id: "aws-s3-q1",
            question: "What is the theoretical durability designed by AWS for objects stored in Amazon S3 Standard?",
            options: [
              "99.9%",
              "99.99%",
              "99.999999999% (11 9's)",
              "100% guarantee with zero loss"
            ],
            correctAnswer: 2,
            explanation: "Amazon S3 Standard is engineered for 99.999999999% (11 nines) of data durability across multiple Availability Zones."
          },
          {
            id: "aws-s3-q2",
            question: "What is the primary identifier used to locate an object within an S3 bucket?",
            options: [
              "The inode number",
              "The object Key (unique name within the bucket)",
              "The server MAC address",
              "The SQL Primary Key index"
            ],
            correctAnswer: 1,
            explanation: "Every object in an Amazon S3 bucket is uniquely addressed by its key (the full path name within the bucket)."
          }
        ]
      },
      {
        id: "lambda",
        subjectId: "aws-cloud",
        title: "Lambda (Serverless Compute)",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "Run code without provisioning or managing servers. Pay only for compute time consumed.",
        explanation: "AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume—there is no charge when your code is not running. Lambda executes your code only when triggered by events (such as S3 uploads, HTTP API Gateway requests, or DynamoDB table updates) and scales automatically from a few requests per day to hundreds of thousands per second.",
        keyPoints: [
          "Event-driven execution: Functions are invoked by triggers such as API Gateway, S3, SQS, or CloudWatch.",
          "Zero server administration: AWS patches the runtime environment, provisions compute, and manages scaling.",
          "Billing is based strictly on invocation count and execution duration measured in milliseconds.",
          "Stateless design: Any persistent state should be stored in S3, DynamoDB, or external caches."
        ],
        examples: `// Simple AWS Lambda handler in Node.js
export const handler = async (event) => {
  const name = event.queryStringParameters?.name || "Student";
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: \`Welcome to StudyPilot, \${name}!\`,
      timestamp: new Date().toISOString()
    })
  };
};`,
        quiz: [
          {
            id: "aws-lambda-q1",
            question: "How does AWS Lambda charge for compute consumption?",
            options: [
              "Flat monthly fee per server instance whether idle or active",
              "By the number of requests and execution duration rounded to the nearest millisecond",
              "By total gigabytes of code stored in the deployment zip",
              "Only when errors occur during execution"
            ],
            correctAnswer: 1,
            explanation: "AWS Lambda pricing is purely usage-based: calculated on total requests and execution time measured in milliseconds."
          },
          {
            id: "aws-lambda-q2",
            question: "What is a core architectural requirement for AWS Lambda functions?",
            options: [
              "They must maintain permanent in-memory state between independent calls",
              "They must be stateless and store persistent state in external datastores like DynamoDB or S3",
              "They require manual SSH access to patch operating system kernels",
              "They can only run during business hours"
            ],
            correctAnswer: 1,
            explanation: "Lambda functions are designed to be stateless because execution containers can be spun up, reused, or destroyed at any moment."
          }
        ]
      },
      {
        id: "iam",
        subjectId: "aws-cloud",
        title: "IAM (Identity & Access Management)",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "Securely manage identities, permissions, and access policies across all AWS services.",
        explanation: "AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources. By applying the principle of least privilege, IAM ensures users and services have only the permissions required to perform their specific tasks.",
        keyPoints: [
          "Principal entities include IAM Users, IAM Groups, and IAM Roles.",
          "IAM Roles are assumed by trusted services (like EC2 or Lambda) or federated users, eliminating hardcoded credentials.",
          "JSON policies define explicit 'Effect': 'Allow' / 'Deny', 'Action', and 'Resource'.",
          "Principle of Least Privilege: Never grant wildcard ('*') admin permissions when specific actions suffice."
        ],
        examples: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadSpecificBucket",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::studypilot-materials",
        "arn:aws:s3:::studypilot-materials/*"
      ]
    }
  ]
}`,
        quiz: [
          {
            id: "aws-iam-q1",
            question: "What is the recommended best practice for granting an EC2 instance or Lambda function access to an S3 bucket?",
            options: [
              "Store root user access keys inside the application code file",
              "Assign an IAM Role with an attached least-privilege policy to the resource",
              "Make the S3 bucket publicly readable and writable by everyone on the Internet",
              "Create a personal IAM user and commit its secrets to GitHub"
            ],
            correctAnswer: 1,
            explanation: "Using an IAM Role allows AWS services to obtain temporary, automatically rotated security credentials without hardcoding secrets."
          }
        ]
      },
      {
        id: "dynamodb",
        subjectId: "aws-cloud",
        title: "DynamoDB (NoSQL Database)",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "Fully managed, serverless NoSQL key-value and document database offering single-digit millisecond latency.",
        explanation: "Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database. You can create database tables that can store and retrieve any amount of data and serve any level of request traffic.",
        keyPoints: [
          "Key-value and document data model with flexible schemas for each item.",
          "Primary keys can be a simple Partition Key (HASH) or a Composite Key (Partition Key + Sort Key).",
          "Single-digit millisecond response times at any scale.",
          "Features include Global Tables (multi-region active-active), DynamoDB Streams, and TTL (Time to Live)."
        ],
        examples: `// Querying DynamoDB using AWS SDK v3
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
const result = await ddb.send(new GetCommand({
  TableName: "StudyPilotUsers",
  Key: { userId: "usr_1001" }
}));
console.log(result.Item);`,
        quiz: [
          {
            id: "aws-ddb-q1",
            question: "In DynamoDB, what constitutes a composite primary key?",
            options: [
              "Two different foreign keys referencing external tables",
              "A Partition Key (Hash) and a Sort Key (Range)",
              "An auto-incrementing integer sequence",
              "A username and an unencrypted password"
            ],
            correctAnswer: 1,
            explanation: "A composite primary key in DynamoDB consists of a Partition Key (used to distribute data across physical storage partitions) and a Sort Key (to order items within a partition)."
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python",
    icon: "Code2",
    tagline: "Build foundational problem-solving, clean scripting, and object-oriented architectures.",
    category: "Programming",
    level: "Beginner to Intermediate",
    topicsCount: 8,
    color: "from-blue-500 to-emerald-500",
    topics: [
      {
        id: "python-basics",
        subjectId: "python",
        title: "Python Basics",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Introduction to Python syntax, indentation rules, comments, and the Python interpreter.",
        explanation: "Python is a high-level, interpreted programming language known for its clean syntax and high readability. Guido van Rossum created Python with the philosophy that code is read much more often than it is written. Python uses whitespace indentation rather than curly brackets to delimit code blocks.",
        keyPoints: [
          "Interpreted language: Python code executes line-by-line via the CPython runtime.",
          "Indentation matters: Consistent 4-space indentation defines statement blocks.",
          "Comments start with the '#' symbol for single lines or triple quotes for docstrings.",
          "Batteries-included standard library provides built-in modules for math, file I/O, and networking."
        ],
        examples: `# Simple Python entry point
def greet_student(name: str) -> str:
    """Return a warm welcome message."""
    return f"Hello, {name}! Welcome to StudyPilot Python mastery."

if __name__ == "__main__":
    message = greet_student("Alex")
    print(message)`,
        quiz: [
          {
            id: "py-basic-q1",
            question: "How does Python define the scope of code blocks such as loops and functions?",
            options: [
              "By enclosing code between { and } curly braces",
              "By enclosing code between begin and end keywords",
              "Through consistent indentation whitespace",
              "By adding semicolons at the end of every statement"
            ],
            correctAnswer: 2,
            explanation: "Python uses indentation (standard 4 spaces) rather than curly braces or keywords to indicate code blocks."
          },
          {
            id: "py-basic-q2",
            question: "Which symbol denotes a single-line comment in Python?",
            options: ["//", "/*", "#", "--"],
            correctAnswer: 2,
            explanation: "In Python, the hash '#' symbol begins a single-line comment."
          }
        ]
      },
      {
        id: "variables",
        subjectId: "python",
        title: "Variables",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Dynamic variable declaration, naming conventions, and memory reference behavior.",
        explanation: "In Python, variables are symbolic names that reference objects in memory. Unlike statically typed languages like C++ or Java, Python variables do not require explicit type declarations. A variable is created the moment you first assign a value to it using the assignment operator '='.",
        keyPoints: [
          "Dynamic typing: A variable can reference an integer, then later be reassigned to a string.",
          "Naming conventions: Use snake_case for variable and function names (PEP 8).",
          "Variables are object pointers: Assigning a = b binds variable 'a' to the same object as 'b'.",
          "Keywords like 'def', 'class', 'if', and 'return' cannot be used as variable names."
        ],
        examples: `# Variable assignments
user_score = 95           # integer
completion_rate = 0.85    # float
student_name = "Maya"     # string
is_enrolled = True        # boolean

print(f"{student_name} scored {user_score}% (Enrolled: {is_enrolled})")`,
        quiz: [
          {
            id: "py-var-q1",
            question: "According to PEP 8, what naming convention is standard for Python variables?",
            options: [
              "camelCase",
              "snake_case",
              "PascalCase",
              "SCREAMING_SNAKE_CASE"
            ],
            correctAnswer: 1,
            explanation: "PEP 8 specifies snake_case (lowercase letters with underscores) for variable and function names."
          }
        ]
      },
      {
        id: "data-types",
        subjectId: "python",
        title: "Data Types",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "Primitive and collection types: int, float, bool, str, tuple, set, and type casting.",
        explanation: "Python features rich built-in data types. Everything in Python is an object, including primitive numbers and strings. Python categorizes types into mutable (can be changed in-place, like lists and dictionaries) and immutable (cannot be altered after creation, like integers, strings, and tuples).",
        keyPoints: [
          "Numbers: int (arbitrary precision) and float (IEEE 754 floating point).",
          "Strings (str) are immutable sequences of Unicode characters.",
          "Booleans: True or False (subclasses of integer with values 1 and 0).",
          "Type inspection with type() and explicit type casting with int(), float(), str()."
        ],
        examples: `x = 42
pi = 3.14159
is_valid = True
quote = "Python is powerful"

# Check types
print(type(x))        # <class 'int'>
print(type(is_valid)) # <class 'bool'>

# Type casting
age_str = "21"
age_num = int(age_str)`,
        quiz: [
          {
            id: "py-dt-q1",
            question: "Which of the following data types in Python is immutable?",
            options: [
              "list",
              "dict",
              "set",
              "tuple"
            ],
            correctAnswer: 3,
            explanation: "Tuples in Python are immutable sequences; once created, their elements cannot be modified, added, or removed."
          }
        ]
      },
      {
        id: "functions",
        subjectId: "python",
        title: "Functions",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        description: "Defining reusable routines with def, parameters, default arguments, *args, and **kwargs.",
        explanation: "A function is a block of organized, reusable code used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing. In Python, functions are first-class citizens, meaning they can be passed as arguments, returned from other functions, and assigned to variables.",
        keyPoints: [
          "Define functions with the 'def' keyword followed by function name and parentheses.",
          "Default parameter values provide fallback values when arguments are omitted.",
          "Variable positional arguments with *args and keyword arguments with **kwargs.",
          "Return values with 'return'; functions without explicit return produce None."
        ],
        examples: `def calculate_grade(score, max_score=100):
    percentage = (score / max_score) * 100
    if percentage >= 90:
        return "A"
    elif percentage >= 80:
        return "B"
    elif percentage >= 70:
        return "C"
    return "Needs Improvement"

print(calculate_grade(85))        # "B"
print(calculate_grade(45, 50))    # "A"`,
        quiz: [
          {
            id: "py-fn-q1",
            question: "What does a Python function return if it executes to the end without reaching a return statement?",
            options: [
              "0",
              "False",
              "None",
              "Raises an UnreturnedValueException"
            ],
            correctAnswer: 2,
            explanation: "In Python, a function that finishes without an explicit return statement implicitly returns the object None."
          }
        ]
      },
      {
        id: "lists",
        subjectId: "python",
        title: "Lists",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "Ordered, mutable collections: indexing, slicing, methods, and list comprehensions.",
        explanation: "Lists are one of Python's most versatile built-in data types. A list is an ordered, mutable sequence of elements that can hold items of diverse types. You can modify items in-place, slice subsets using start:stop:step syntax, and transform lists concisely with list comprehensions.",
        keyPoints: [
          "Zero-based indexing: list[0] is the first item, list[-1] accesses the last item.",
          "Slicing syntax: list[start:stop:step].",
          "Common methods: .append(), .extend(), .pop(), .sort(), and .insert().",
          "List comprehension offers elegant mapping and filtering: [x**2 for x in nums if x > 0]."
        ],
        examples: `skills = ["AWS", "Python", "Java"]
skills.append("Web Dev")

# Slicing
first_two = skills[:2] # ['AWS', 'Python']

# List comprehension: square even numbers
numbers = [1, 2, 3, 4, 5, 6]
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares) # [4, 16, 36]`,
        quiz: [
          {
            id: "py-list-q1",
            question: "Given lst = [10, 20, 30, 40, 50], what is the value of lst[1:4]?",
            options: [
              "[10, 20, 30]",
              "[20, 30, 40]",
              "[20, 30, 40, 50]",
              "[10, 20, 30, 40]"
            ],
            correctAnswer: 1,
            explanation: "Python slicing is half-open: lst[1:4] extracts indices 1, 2, and 3, which are [20, 30, 40]."
          }
        ]
      },
      {
        id: "dictionaries",
        subjectId: "python",
        title: "Dictionaries",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "Key-value hash maps: fast O(1) lookups, dictionary methods, and dictionary comprehensions.",
        explanation: "A dictionary in Python is an unordered (ordered by insertion starting from Python 3.7) collection of key-value pairs. Keys must be hashable and immutable (such as strings, numbers, or tuples), while values can be of any data type. Dictionaries provide average O(1) time complexity for key lookups, insertions, and deletions.",
        keyPoints: [
          "Created using curly braces: student = {'name': 'Jordan', 'gpa': 3.9}.",
          "Access safely with .get(key, default) to avoid KeyError on missing keys.",
          "Iterate over keys (.keys()), values (.values()), or pairs (.items()).",
          "Fast dictionary comprehensions: {item.id: item.name for item in items}."
        ],
        examples: `student_profile = {
    "name": "Jordan",
    "streak": 5,
    "skills": ["Python", "AWS"]
}

# Safe lookup
score = student_profile.get("score", 0)

# Iteration
for key, value in student_profile.items():
    print(f"{key}: {value}")`,
        quiz: [
          {
            id: "py-dict-q1",
            question: "Which method allows accessing a dictionary key with a safe default value if the key does not exist?",
            options: [
              "dict.find(key, default)",
              "dict.get(key, default)",
              "dict.lookup(key, default)",
              "dict.has(key, default)"
            ],
            correctAnswer: 1,
            explanation: "dict.get(key, default) returns the value if the key exists, or the specified default if it does not, avoiding a KeyError."
          }
        ]
      },
      {
        id: "loops",
        subjectId: "python",
        title: "Loops",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Iterating with for-in loops, while loops, range(), break, continue, and else clauses.",
        explanation: "Loops are fundamental constructs that allow programs to execute a block of statements repeatedly. Python provides 'for' loops (which iterate over iterable objects such as lists, strings, and ranges) and 'while' loops (which execute as long as a condition evaluates to True).",
        keyPoints: [
          "For loops iterate directly over elements: for item in collection: ...",
          "range(start, stop, step) generates arithmetic progressions efficiently.",
          "'break' immediately terminates the loop; 'continue' skips to the next iteration.",
          "Loops in Python support an optional 'else' block that executes when the loop finishes without hitting a break."
        ],
        examples: `# For loop with enumerate
subjects = ["AWS", "Python", "Java"]
for index, subject in enumerate(subjects, start=1):
    print(f"Step {index}: Master {subject}")

# While loop with break
counter = 0
while True:
    counter += 1
    if counter == 3:
        break`,
        quiz: [
          {
            id: "py-loop-q1",
            question: "What function generates a sequence of numbers from 0 up to (but not including) n in a for loop?",
            options: ["sequence(n)", "range(n)", "loop(n)", "series(n)"],
            correctAnswer: 1,
            explanation: "The range(n) function produces an iterable sequence of integers from 0 up to n - 1."
          }
        ]
      },
      {
        id: "oop",
        subjectId: "python",
        title: "OOP (Object-Oriented Programming)",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        description: "Classes, instances, the __init__ constructor, encapsulation, inheritance, and polymorphism.",
        explanation: "Object-Oriented Programming (OOP) in Python allows developers to model real-world concepts as classes containing attributes (state) and methods (behavior). Python supports all major OOP paradigms including encapsulation, inheritance, method overriding, and polymorphism.",
        keyPoints: [
          "Define classes with 'class Name:'.",
          "The '__init__' method initializes new instance attributes; 'self' refers to the current instance.",
          "Inheritance allows a subclass to inherit attributes and methods from a parent class.",
          "The 'super()' function calls methods on the parent class."
        ],
        examples: `class Learner:
    def __init__(self, name: str, level: str = "Beginner"):
        self.name = name
        self.level = level
        self.points = 0

    def complete_topic(self, score: int):
        self.points += score
        return f"{self.name} now has {self.points} points!"

learner = Learner("Taylor")
print(learner.complete_topic(100))`,
        quiz: [
          {
            id: "py-oop-q1",
            question: "In a Python class method, what does the 'self' parameter refer to?",
            options: [
              "The global module scope",
              "The specific instance of the class that called the method",
              "The superclass definition",
              "A copy of the Python standard library"
            ],
            correctAnswer: 1,
            explanation: "'self' represents the instance of the class itself, allowing access to instance attributes and methods."
          }
        ]
      }
    ]
  },
  {
    id: "java",
    title: "Java",
    icon: "Coffee",
    tagline: "Strongly typed enterprise programming, robust JVM architecture, and clean OOP abstractions.",
    category: "Programming",
    level: "Intermediate",
    topicsCount: 7,
    color: "from-red-500 to-rose-600",
    topics: [
      {
        id: "java-basics",
        subjectId: "java",
        title: "Java Basics",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "JVM, JRE, JDK, bytecode compilation, class structure, and the main entry method.",
        explanation: "Java is a popular, class-based, object-oriented programming language designed for write-once, run-anywhere (WORA) cross-platform execution. Java source code (.java) is compiled into bytecode (.class) by javac, which then runs inside the Java Virtual Machine (JVM) on any supported OS.",
        keyPoints: [
          "Write Once, Run Anywhere: JVM provides a platform-independent abstraction layer.",
          "Every Java program must be declared inside a class.",
          "The entry point is 'public static void main(String[] args)'.",
          "Strict static typing: variable types must be declared and checked at compile time."
        ],
        examples: `public class StudyPilotApp {
    public static void main(String[] args) {
        System.out.println("Welcome to StudyPilot Java track!");
        int totalTopics = 7;
        System.out.println("Total topics to conquer: " + totalTopics);
    }
}`,
        quiz: [
          {
            id: "java-basic-q1",
            question: "What component executes compiled Java bytecode on the host computer?",
            options: [
              "Java Development Kit (JDK) compiler",
              "Java Virtual Machine (JVM)",
              "Operating System BIOS",
              "Web Browser JavaScript Engine"
            ],
            correctAnswer: 1,
            explanation: "The JVM (Java Virtual Machine) translates and executes compiled Java bytecode into machine instructions."
          },
          {
            id: "java-basic-q2",
            question: "What is the exact signature of the entry method in a standard Java application?",
            options: [
              "void main()",
              "public static void main(String[] args)",
              "static int main(String[] argv)",
              "public function main(args)"
            ],
            correctAnswer: 1,
            explanation: "In Java, standard applications begin execution at 'public static void main(String[] args)'."
          }
        ]
      },
      {
        id: "java-variables",
        subjectId: "java",
        title: "Variables",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Primitive types (byte, short, int, long, float, double, char, boolean) and reference types.",
        explanation: "Java is a strongly typed language. Every variable in Java must have a declared type before it can be used. Java provides eight primitive types representing raw values stored directly in memory, as well as reference types (like String, Arrays, and custom Objects) that store references to objects located on the heap.",
        keyPoints: [
          "8 primitives: byte, short, int, long, float, double, char, and boolean.",
          "Reference variables point to objects stored in the garbage-collected heap memory.",
          "The 'final' keyword creates constants whose values cannot be reassigned.",
          "Type conversion: implicit widening (int -> double) and explicit narrowing cast ((int) 3.99)."
        ],
        examples: `// Primitives vs References
int studentId = 1042;
double gpa = 3.85;
boolean isGraduated = false;
final String UNIVERSITY_NAME = "Tech University";

String studentName = new String("Sarah");`,
        quiz: [
          {
            id: "java-var-q1",
            question: "Which Java keyword is used to declare a constant whose value cannot be changed once assigned?",
            options: ["const", "immutable", "final", "static"],
            correctAnswer: 2,
            explanation: "The 'final' keyword in Java declares a constant variable whose value cannot be reassigned."
          }
        ]
      },
      {
        id: "classes",
        subjectId: "java",
        title: "Classes",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "Blueprints for objects, access modifiers (private, protected, public), and constructors.",
        explanation: "A class in Java is a blueprint from which individual objects are created. Classes encapsulate fields (state variables) and methods (behavior). Constructors are special methods with the same name as the class that initialize newly allocated objects.",
        keyPoints: [
          "Access modifiers control visibility: public (everywhere), protected (package + subclasses), private (class only).",
          "Constructors initialize object state and have no return type.",
          "Getter and setter methods provide controlled access to private fields (encapsulation).",
          "The 'this' keyword refers to the current object instance within a method or constructor."
        ],
        examples: `public class Course {
    private String title;
    private int credits;

    public Course(String title, int credits) {
        this.title = title;
        this.credits = credits;
    }

    public String getTitle() {
        return this.title;
    }
}`,
        quiz: [
          {
            id: "java-cls-q1",
            question: "Which access modifier restricts field access exclusively to within the class itself?",
            options: ["public", "protected", "private", "default (package-private)"],
            correctAnswer: 2,
            explanation: "The 'private' access modifier ensures that members can only be accessed within the declared class itself."
          }
        ]
      },
      {
        id: "objects",
        subjectId: "java",
        title: "Objects",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "Instantiating objects with new, heap memory allocation, and garbage collection.",
        explanation: "An object is an instance of a Java class that possesses state and behavior. When you use the 'new' keyword, Java allocates memory on the heap and executes the appropriate constructor to initialize that object. Java's automatic Garbage Collector frees memory occupied by objects that are no longer reachable.",
        keyPoints: [
          "Instantiation uses the 'new' keyword: Course c = new Course(\"Java\", 4);",
          "Stack vs Heap: Variable references live on the call stack; object instances live on the heap.",
          "Garbage Collection automatically cleans unreferenced objects, avoiding manual free() memory leaks.",
          "Objects inherit common methods from java.lang.Object: equals(), hashCode(), and toString()."
        ],
        examples: `Course javaCourse = new Course("Java Mastery", 4);
Course awsCourse = new Course("AWS Cloud Architecture", 3);

System.out.println(javaCourse.getTitle()); // "Java Mastery"`,
        quiz: [
          {
            id: "java-obj-q1",
            question: "Where are object instances stored in Java runtime memory?",
            options: [
              "On the execution stack",
              "In the heap memory",
              "In CPU register cache",
              "Directly in the source file"
            ],
            correctAnswer: 1,
            explanation: "In Java, all object instances are dynamically allocated in heap memory, managed by the Garbage Collector."
          }
        ]
      },
      {
        id: "inheritance",
        subjectId: "java",
        title: "Inheritance",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "Extending classes, code reuse, the extends keyword, method overriding, and super.",
        explanation: "Inheritance is an essential OOP mechanism where a new class (subclass or child class) inherits fields and methods from an existing class (superclass or parent class). Java supports single class inheritance using the 'extends' keyword, allowing subclasses to override methods for specialized behavior.",
        keyPoints: [
          "Declared with the 'extends' keyword: class Student extends Person.",
          "Java supports single class inheritance (a class can extend only one superclass).",
          "Use '@Override' annotation when redefining superclass methods in a child class.",
          "'super()' calls the constructor of the parent class."
        ],
        examples: `public class User {
    protected String username;
    public User(String username) { this.username = username; }
}

public class StudentUser extends User {
    private int streak;
    public StudentUser(String username, int streak) {
        super(username);
        this.streak = streak;
    }
}`,
        quiz: [
          {
            id: "java-inh-q1",
            question: "How many superclasses can a Java class directly inherit from via the 'extends' keyword?",
            options: ["Exactly one", "Up to two", "Any unlimited number", "Zero"],
            correctAnswer: 0,
            explanation: "Java does not support multiple class inheritance; a class can directly extend only one single superclass."
          }
        ]
      },
      {
        id: "interfaces",
        subjectId: "java",
        title: "Interfaces",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "Contract-based polymorphism, the implements keyword, default methods, and multiple interface support.",
        explanation: "An interface in Java is a reference type that specifies a contract of abstract methods that implementing classes must supply. Unlike classes, a Java class can implement multiple interfaces, allowing full polymorphic behavior without multiple inheritance issues.",
        keyPoints: [
          "Declared with the 'interface' keyword; classes attach with 'implements'.",
          "All methods in a standard interface are public and abstract by default (unless marked default or static).",
          "A class can implement any number of interfaces: class App implements Runnable, Serializable.",
          "Decouples service consumers from concrete implementation classes."
        ],
        examples: `public interface Evaluatable {
    int calculateScore();
    boolean isPassed();
}

public class QuizAttempt implements Evaluatable {
    private int score;
    public QuizAttempt(int score) { this.score = score; }
    
    @Override
    public int calculateScore() { return this.score; }
    @Override
    public boolean isPassed() { return this.score >= 70; }
}`,
        quiz: [
          {
            id: "java-intf-q1",
            question: "Can a Java class implement more than one interface?",
            options: [
              "No, Java limits both classes and interfaces to single inheritance",
              "Yes, a class can implement multiple interfaces separated by commas",
              "Only if all interfaces have zero methods",
              "Only in Java 1.0"
            ],
            correctAnswer: 1,
            explanation: "Yes, Java permits a class to implement multiple interfaces, enabling flexible polymorphic contracts."
          }
        ]
      },
      {
        id: "exception-handling",
        subjectId: "java",
        title: "Exception Handling",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "Robust error handling with try, catch, finally, throw, throws, and checked vs unchecked exceptions.",
        explanation: "Java provides a robust exception-handling mechanism to deal with runtime errors, ensuring that application execution does not crash abruptly. Exceptions in Java are divided into Checked exceptions (checked at compile time, subclasses of Exception) and Unchecked exceptions (subclasses of RuntimeException).",
        keyPoints: [
          "The 'try' block contains code that might throw an exception.",
          "The 'catch' block handles the specific exception type.",
          "The 'finally' block always executes regardless of whether an exception was caught or thrown.",
          "Checked exceptions must be caught or declared with the 'throws' clause in the method signature."
        ],
        examples: `try {
    int divisor = 0;
    int result = 100 / divisor;
} catch (ArithmeticException ex) {
    System.err.println("Cannot divide by zero: " + ex.getMessage());
} finally {
    System.out.println("Cleanup tasks completed.");
}`,
        quiz: [
          {
            id: "java-ex-q1",
            question: "Which block in a Java try-catch statement is guaranteed to execute, even if an exception is thrown?",
            options: ["catch", "finally", "throw", "default"],
            correctAnswer: 1,
            explanation: "The 'finally' block always executes after try and catch blocks finish, commonly used for releasing resources."
          }
        ]
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: "Globe",
    tagline: "Modern full-stack web engineering: HTML5, CSS3, modern JavaScript, DOM, and RESTful APIs.",
    category: "Full Stack",
    level: "Beginner to Intermediate",
    topicsCount: 6,
    color: "from-cyan-500 to-indigo-600",
    topics: [
      {
        id: "html",
        subjectId: "web-dev",
        title: "HTML",
        difficulty: "Beginner",
        estimatedTime: "15 mins",
        description: "Semantic HTML5 markup, document structure, accessibility attributes, and modern web elements.",
        explanation: "HyperText Markup Language (HTML) is the standard markup language for creating web pages. It defines the structure and meaning of web content. Modern HTML5 introduces semantic elements like <header>, <nav>, <main>, <article>, and <section> that improve document readability for search engines and screen readers.",
        keyPoints: [
          "Semantic tags (<main>, <article>, <section>, <nav>) provide accessible document structure.",
          "Forms and input elements collect user interaction data.",
          "Accessibility: 'alt' attributes for images, 'aria-label' for interactive screen reader controls.",
          "The Document Type Declaration (<!DOCTYPE html>) triggers modern standards rendering mode."
        ],
        examples: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>StudyPilot - Student Portal</title>
</head>
<body>
  <header>
    <h1>StudyPilot</h1>
    <nav aria-label="Primary Navigation">
      <a href="/subjects">Subjects</a>
      <a href="/quiz">Practice</a>
    </nav>
  </header>
  <main>
    <article>
      <h2>HTML5 Semantics</h2>
      <p>Semantic markup makes the web accessible to everyone.</p>
    </article>
  </main>
</body>
</html>`,
        quiz: [
          {
            id: "web-html-q1",
            question: "Which HTML5 tag should be used to wrap the central unique content of a webpage?",
            options: ["<div>", "<main>", "<content>", "<center>"],
            correctAnswer: 1,
            explanation: "The <main> element represents the dominant content of the <body> of a document."
          },
          {
            id: "web-html-q2",
            question: "What attribute must be provided on <img> tags to assist screen readers and improve accessibility?",
            options: ["title", "href", "alt", "aria-picture"],
            correctAnswer: 2,
            explanation: "The 'alt' (alternative text) attribute provides a textual description of images for screen readers and search engines."
          }
        ]
      },
      {
        id: "css",
        subjectId: "web-dev",
        title: "CSS",
        difficulty: "Beginner",
        estimatedTime: "20 mins",
        description: "Cascading Style Sheets, selectors, box model, Flexbox, Grid, and modern CSS variables.",
        explanation: "Cascading Style Sheets (CSS) describe how HTML elements are to be displayed on screen, paper, or in other media. CSS handles styling, layout, typography, animations, and responsive adaptations across various device viewports.",
        keyPoints: [
          "The Box Model consists of Content, Padding, Border, and Margin.",
          "Flexbox (display: flex) creates flexible 1D row or column layouts.",
          "CSS Grid (display: grid) provides powerful 2D grid-based layouts.",
          "CSS Custom Properties (--primary-color: #38bdf8) enable consistent design tokens."
        ],
        examples: `:root {
  --brand-navy: #0b0f19;
  --accent-cyan: #38bdf8;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: var(--brand-navy);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}`,
        quiz: [
          {
            id: "web-css-q1",
            question: "In the CSS Box Model, which layer is positioned between the padding and the margin?",
            options: ["Content", "Border", "Outline", "Box-sizing"],
            correctAnswer: 1,
            explanation: "From inside out, the Box Model order is: Content -> Padding -> Border -> Margin."
          },
          {
            id: "web-css-q2",
            question: "Which CSS display value enables a flexible one-dimensional layout system along a main axis?",
            options: ["display: block", "display: grid", "display: flex", "display: inline-block"],
            correctAnswer: 2,
            explanation: "Flexbox (display: flex) is designed for 1-dimensional layouts across either a row or a column."
          }
        ]
      },
      {
        id: "javascript",
        subjectId: "web-dev",
        title: "JavaScript",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "Modern ECMAScript (ES6+): let/const, arrow functions, destructuring, promises, and async/await.",
        explanation: "JavaScript is the premier programming language of the Web, enabling dynamic interactivity, asynchronous network communication, and rich frontend client applications. Modern JavaScript (ES6 and beyond) features block scoping, arrow functions, modules, and first-class async/await asynchronous primitives.",
        keyPoints: [
          "Block scoped variables using 'let' and immutable references using 'const' (avoid legacy 'var').",
          "Arrow functions offer concise syntax and lexical 'this' binding.",
          "Destructuring assignment for unpacking objects and arrays concisely.",
          "Asynchronous programming with Promises and clean 'async/await' syntax."
        ],
        examples: `// Modern async JavaScript function
const fetchStudentProgress = async (studentId) => {
  try {
    const response = await fetch(\`/api/progress/\${studentId}\`);
    if (!response.ok) throw new Error("Failed to load progress");
    const { topicsCompleted, averageScore } = await response.json();
    return { topicsCompleted, averageScore };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};`,
        quiz: [
          {
            id: "web-js-q1",
            question: "Which keyword should be used in modern JavaScript to declare a variable that should never be reassigned?",
            options: ["var", "let", "const", "static"],
            correctAnswer: 2,
            explanation: "'const' creates a block-scoped variable whose identifier cannot be reassigned."
          }
        ]
      },
      {
        id: "dom",
        subjectId: "web-dev",
        title: "DOM (Document Object Model)",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "The browser Document Object Model tree, element selection, event listeners, and dynamic DOM manipulation.",
        explanation: "The Document Object Model (DOM) is an API for HTML and XML documents. It represents the page as a structured tree of nodes and objects so that programs can change the document structure, style, and content. When you interact with a button or type in a field, the DOM dispatches events that JavaScript handlers can capture.",
        keyPoints: [
          "The DOM represents the HTML document as a hierarchical tree of nodes.",
          "Querying elements with document.querySelector() and document.querySelectorAll().",
          "Attaching user event handlers with element.addEventListener('click', handler).",
          "Event bubbling and delegation allow efficient management of interactive lists."
        ],
        examples: `// DOM manipulation
const submitBtn = document.querySelector("#submit-quiz-btn");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  submitBtn.textContent = "Grading...";
  submitBtn.disabled = true;
});`,
        quiz: [
          {
            id: "web-dom-q1",
            question: "Which modern DOM method selects the first element matching a CSS selector string?",
            options: [
              "document.getElementById()",
              "document.querySelector()",
              "document.findFirst()",
              "document.getElementsByClassName()"
            ],
            correctAnswer: 1,
            explanation: "document.querySelector() returns the first Element within the document that matches the specified selector."
          }
        ]
      },
      {
        id: "responsive-design",
        subjectId: "web-dev",
        title: "Responsive Design",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        description: "Mobile-first layouts, CSS media queries, fluid sizing (rem, vw/vh), and responsive images.",
        explanation: "Responsive web design is an approach where web pages render well on a variety of devices and window or screen sizes. By utilizing a mobile-first philosophy, fluid grid layouts, flexible images, and CSS media queries, web apps seamlessly adjust from smartphone screens to large desktop monitors.",
        keyPoints: [
          "The viewport meta tag (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">) is essential.",
          "Media queries apply styling rules based on screen widths (e.g., @media (min-width: 768px)).",
          "Relative units (rem, em, %, vh/vw) adapt smoothly compared to rigid fixed pixels.",
          "Modern CSS Grid and Flexbox with flex-wrap and auto-fit eliminate complex media query stacks."
        ],
        examples: `/* Mobile First CSS */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and Desktop breakpoint */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 240px 1fr;
  }
}`,
        quiz: [
          {
            id: "web-rd-q1",
            question: "What is the primary design philosophy where styling is authored for smartphones first, then progressively enhanced for larger screens?",
            options: [
              "Desktop-first design",
              "Mobile-first responsive design",
              "Graceful degradation",
              "Fixed width architecture"
            ],
            correctAnswer: 1,
            explanation: "Mobile-first design establishes base styles for small screens and uses min-width media queries to enhance layouts as screen width expands."
          }
        ]
      },
      {
        id: "apis",
        subjectId: "web-dev",
        title: "APIs (Application Programming Interfaces)",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        description: "RESTful architecture, HTTP methods (GET, POST, PUT, DELETE), status codes, and JSON serialization.",
        explanation: "An Application Programming Interface (API) enables communication between different software systems. In web development, RESTful APIs allow frontend single-page applications (like React) to request and update data on backend servers (like Node.js / Express) using standard HTTP methods and JSON data format.",
        keyPoints: [
          "HTTP Verbs: GET (retrieve), POST (create), PUT/PATCH (update), DELETE (remove).",
          "HTTP Status Codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error).",
          "JSON (JavaScript Object Notation) is the universal payload format for web APIs.",
          "CORS (Cross-Origin Resource Sharing) headers protect APIs from unauthorized browser domains."
        ],
        examples: `// Express REST API Route
app.post("/api/quiz/submit", (req, res) => {
  const { score, total } = req.body;
  if (total <= 0) {
    return res.status(400).json({ error: "Invalid total questions" });
  }
  const percentage = Math.round((score / total) * 100);
  return res.status(200).json({ score, total, percentage });
});`,
        quiz: [
          {
            id: "web-api-q1",
            question: "Which HTTP status code signifies that a resource was successfully created on the server?",
            options: ["200 OK", "201 Created", "204 No Content", "302 Found"],
            correctAnswer: 1,
            explanation: "The HTTP 201 Created status code indicates that the request has succeeded and has led to the creation of a resource."
          }
        ]
      }
    ]
  }
];

/**
 * Subject-level comprehensive quiz pools (ensuring at least 5 questions per major subject)
 */
export const seedSubjectQuizzes = {
  "aws-cloud": [
    {
      id: "aws-sq-1",
      question: "Which AWS service provides object storage with 99.999999999% (11 9s) durability?",
      options: ["Amazon EBS", "Amazon EFS", "Amazon S3", "AWS Storage Gateway"],
      correctAnswer: 2,
      explanation: "Amazon S3 is designed for 11 9s of durability across multiple Availability Zones."
    },
    {
      id: "aws-sq-2",
      question: "Which compute service lets you run code without provisioning or managing servers?",
      options: ["Amazon EC2", "AWS Lambda", "Amazon Lightsail", "Amazon ECS"],
      correctAnswer: 1,
      explanation: "AWS Lambda is a serverless compute service that executes code on demand."
    },
    {
      id: "aws-sq-3",
      question: "What AWS database service provides fully managed NoSQL key-value and document storage with single-digit millisecond latency?",
      options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
      correctAnswer: 1,
      explanation: "Amazon DynamoDB is a managed NoSQL database service."
    },
    {
      id: "aws-sq-4",
      question: "Which AWS security feature should you attach to an EC2 instance to safely grant it access to S3 without saving access keys?",
      options: ["IAM Role", "Root user password", "SSH Public Key", "Network ACL"],
      correctAnswer: 0,
      explanation: "IAM Roles provide temporary credentials to AWS resources like EC2 instances."
    },
    {
      id: "aws-sq-5",
      question: "What term describes the ability of a cloud architecture to automatically scale compute capacity up or down based on current traffic?",
      options: ["Fault tolerance", "Elasticity", "Disaster recovery", "Latency"],
      correctAnswer: 1,
      explanation: "Elasticity allows systems to adapt dynamically to workload fluctuations without manual intervention."
    }
  ],
  "python": [
    {
      id: "py-sq-1",
      question: "Which of the following data structures in Python is ordered, mutable, and allows duplicate elements?",
      options: ["set", "tuple", "list", "frozenset"],
      correctAnswer: 2,
      explanation: "Python lists are ordered, mutable, and allow duplicate items."
    },
    {
      id: "py-sq-2",
      question: "How do you start a function definition in Python?",
      options: ["function myFunc()", "def my_func():", "func my_func():", "void myFunc():"],
      correctAnswer: 1,
      explanation: "In Python, functions are defined using the 'def' keyword."
    },
    {
      id: "py-sq-3",
      question: "What is the output of print(2 ** 3) in Python?",
      options: ["6", "8", "9", "5"],
      correctAnswer: 1,
      explanation: "The ** operator in Python computes exponentiation: 2 to the power 3 equals 8."
    },
    {
      id: "py-sq-4",
      question: "Which method removes and returns the last item from a Python list?",
      options: [".remove()", ".pop()", ".delete()", ".shift()"],
      correctAnswer: 1,
      explanation: "The .pop() method removes and returns the last element from a list."
    },
    {
      id: "py-sq-5",
      question: "What is the purpose of the '__init__' method in a Python class?",
      options: [
        "To destroy the instance and free memory",
        "To initialize a new instance of the class",
        "To declare the class as an abstract base class",
        "To import required external modules"
      ],
      correctAnswer: 1,
      explanation: "The '__init__' method is the constructor that initializes object attributes when an instance is created."
    }
  ],
  "java": [
    {
      id: "java-sq-1",
      question: "What does WORA stand for in Java's architectural design?",
      options: [
        "Write Once, Run Anywhere",
        "Web Object Routing Architecture",
        "Windows Operating Runtime Application",
        "Write Once, Recompile Always"
      ],
      correctAnswer: 0,
      explanation: "WORA stands for 'Write Once, Run Anywhere', enabled by the Java Virtual Machine (JVM)."
    },
    {
      id: "java-sq-2",
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      correctAnswer: 1,
      explanation: "The 'extends' keyword is used to derive a subclass from a superclass in Java."
    },
    {
      id: "java-sq-3",
      question: "Which of the following is NOT a primitive data type in Java?",
      options: ["int", "boolean", "String", "double"],
      correctAnswer: 2,
      explanation: "String is a class (reference type), not one of Java's 8 primitive data types."
    },
    {
      id: "java-sq-4",
      question: "Which access modifier allows access to a member only within the same package and by subclasses?",
      options: ["public", "private", "protected", "final"],
      correctAnswer: 2,
      explanation: "'protected' allows access within the same package as well as by subclasses in other packages."
    },
    {
      id: "java-sq-5",
      question: "Which block in exception handling will execute whether an exception is caught or not?",
      options: ["try", "catch", "finally", "throw"],
      correctAnswer: 2,
      explanation: "The 'finally' block is guaranteed to execute regardless of whether an exception occurs."
    }
  ],
  "web-dev": [
    {
      id: "web-sq-1",
      question: "Which HTML5 semantic element is best suited to represent navigation links?",
      options: ["<section>", "<nav>", "<aside>", "<menu>"],
      correctAnswer: 1,
      explanation: "<nav> is the designated HTML5 element for major navigational link groups."
    },
    {
      id: "web-sq-2",
      question: "In CSS, what property changes the inner spacing between the content and the border of an element?",
      options: ["margin", "padding", "border-spacing", "gap"],
      correctAnswer: 1,
      explanation: "Padding controls the internal space between element content and its border."
    },
    {
      id: "web-sq-3",
      question: "Which JavaScript keyword declares a block-scoped variable that cannot be reassigned?",
      options: ["var", "let", "const", "def"],
      correctAnswer: 2,
      explanation: "'const' creates block-scoped read-only identifier bindings."
    },
    {
      id: "web-sq-4",
      question: "What HTTP method should be used when submitting a form to create a new record in a REST API?",
      options: ["GET", "POST", "PUT", "PATCH"],
      correctAnswer: 1,
      explanation: "HTTP POST is standard for creating new resources on a server."
    },
    {
      id: "web-sq-5",
      question: "Which CSS feature enables styling changes based on the viewport width of the user's device?",
      options: ["CSS Keyframes", "Media Queries (@media)", "CSS Filters", "Flexbox align-items"],
      correctAnswer: 1,
      explanation: "Media Queries (@media) allow conditional CSS rules depending on device capabilities and viewport dimensions."
    }
  ]
};
