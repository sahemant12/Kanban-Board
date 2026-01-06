const boardObject = [
  {
    id: 1741325549285,
    boardName: "Todo",
    description: "Tasks that I need to complete.",
    tasks: [
      "Understand execution context",
      "Learn event loop & call stack",
      "Revise array methods"
    ],
    isAddTask: true,
    color: "#1a5ae4"
  },
  {
    id: 1741325578595,
    boardName: "In Progress",
    description: "Tasks I am currently working on.",
    tasks: [
      "Lexical scoping",
      "Closures with examples",
      "this keyword in different contexts"
    ],
    color: "#038b03"
  },
  {
    id: 1741325593155,
    boardName: "Done",
    description: "Tasks that have been completed.",
    tasks: [
      "JavaScript data types",
      "Hoisting (var, let, const)",
      "Shallow vs deep copy"
    ],
    color: "#6b7280"
  }
];

export default boardObject;
