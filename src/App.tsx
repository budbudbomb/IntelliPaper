// @ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Layers,
  Type,
  Hash,
  BrainCircuit,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Image as ImageIcon,
  Sigma,
  Save,
  Plus,
  CheckCircle2,
  ChevronDown,
  Search,
  Paperclip,
  LayoutDashboard,
  Settings,
  FileQuestion,
  Menu,
  CheckSquare,
  Filter,
  Edit,
  Trash2,
  X,
  ListPlus,
  User,
  ClipboardCheck,
  Check,
  XCircle,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Target,
  AlertTriangle,
  Zap,
  BarChart,
  Database,
  ShieldCheck,
  Users,
  UserCheck,
  LayoutGrid,
  List,
  Star,
  Eye,
} from "lucide-react";

// --- Mock Data ---
const SUBJECTS = {
  Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
  Science: ["Physics", "Chemistry", "Biology", "Environmental"],
  English: ["Grammar", "Literature", "Writing", "Comprehension"],
};

const TOPICS = [
  "Linear Equations",
  "Quadratic Equations",
  "Cell Structure",
  "Thermodynamics",
  "Shakespeare",
  "Verbs & Nouns",
  "Ecosystems",
];

const EMPLOYEES = [
  { id: "EMP001", name: "Dr. Sarah Jenkins",  designation: "Senior Examiner",       office: "Block A, Room 201" },
  { id: "EMP002", name: "Prof. David Chen",   designation: "Head of Department",    office: "Block B, Room 105" },
  { id: "EMP003", name: "Ms. Priya Sharma",   designation: "Academic Coordinator",  office: "Block A, Room 110" },
  { id: "EMP004", name: "Mr. Robert Taylor",  designation: "Subject Expert",        office: "Block C, Room 302" },
  { id: "EMP005", name: "Dr. Emily White",    designation: "Senior Examiner",       office: "Block B, Room 220" },
  { id: "EMP006", name: "Mr. Anil Kumar",     designation: "Content Reviewer",      office: "Block D, Room 401" },
  { id: "EMP007", name: "Mrs. Linda Brown",   designation: "Academic Coordinator",  office: "Block A, Room 115" },
];

const INITIAL_QUESTIONS = [
  {
    id: 1,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    questionType: "Short answer type",
    difficulty: "Medium",
    marks: 3,
    cognitiveRating: ["Application"],
    questionText:
      "Solve the system of linear equations: 2x + y = 5 and x - y = 1.",
    modelAnswer: "x = 2, y = 1.",
    author: "Anonymous",
    status: "Published",
  },
  {
    id: 101,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    questionType: "Multiple Choice",
    difficulty: "Hard",
    marks: 1,
    cognitiveRating: ["Understanding", "Application"],
    questionText:
      "What are the roots of the quadratic equation x² - 5x + 6 = 0?",
    options: [
      { text: "2 and 3", isCorrect: true },
      { text: "-2 and -3", isCorrect: false },
      { text: "1 and 6", isCorrect: false },
    ],
    author: "Dr. Sarah Jenkins",
    status: "Published",
  },
  {
    id: 102,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Mathematics",
    chapter: "Trigonometry",
    topic: "Ratios",
    questionType: "True/False",
    difficulty: "Easy",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText: "The value of sin(90°) is 1.",
    trueFalseAnswer: "true",
    author: "Prof. David Chen",
    status: "Published",
  },
  {
    id: 103,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "Triangles",
    questionType: "Fill in the blanks",
    difficulty: "Medium",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText:
      "In a right-angled triangle, the square of the hypotenuse is equal to the ___ of the squares of the other two sides.",
    fillInBlankAnswer: "sum",
    author: "Anonymous",
    status: "Published",
  },
  {
    id: 2,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Physics",
    topic: "Thermodynamics",
    questionType: "Multiple Choice",
    difficulty: "Easy",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText:
      "Which law states that energy cannot be created or destroyed?",
    options: [
      { text: "First Law", isCorrect: true },
      { text: "Second Law", isCorrect: false },
    ],
    author: "Anonymous",
    status: "Published",
  },
  {
    id: 201,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Biology",
    topic: "Cell Structure",
    questionType: "Match the Pair",
    difficulty: "Medium",
    marks: 4,
    cognitiveRating: ["Understanding"],
    questionText: "Match the cell organelle with its primary function.",
    matchPairs: [
      { left: "Nucleus", right: "Control Center" },
      { left: "Mitochondria", right: "Energy Production" },
      { left: "Ribosome", right: "Protein Synthesis" },
    ],
    author: "Dr. Emily White",
    status: "Published",
  },
  {
    id: 202,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Chemistry",
    topic: "Acids and Bases",
    questionType: "Short answer type",
    difficulty: "Hard",
    marks: 3,
    cognitiveRating: ["Application"],
    questionText:
      "Explain what happens when an acid reacts with a metal carbonate, providing a balanced chemical equation.",
    modelAnswer: "It produces salt, water, and carbon dioxide gas.",
    author: "Ms. Priya Sharma",
    status: "Published",
  },
  {
    id: 203,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Physics",
    topic: "Light",
    questionType: "True/False",
    difficulty: "Easy",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText: "Convex lenses always form virtual images.",
    trueFalseAnswer: "false",
    author: "Mr. Anil Kumar",
    status: "Published",
  },
  {
    id: 3,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Biology",
    topic: "Cell Structure",
    questionType: "True/False",
    difficulty: "Easy",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText:
      "Mitochondria is generally known as the powerhouse of the cell.",
    trueFalseAnswer: "true",
    author: "Anonymous",
    status: "Pending",
  },
  {
    id: 4,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Science",
    chapter: "Physics",
    topic: "Thermodynamics",
    questionType: "Multiple Choice",
    difficulty: "Medium",
    marks: 1,
    cognitiveRating: ["Understanding"],
    questionText:
      "Which law states that energy cannot be created or destroyed?",
    options: [
      { text: "First Law", isCorrect: true },
      { text: "Second Law", isCorrect: false },
      { text: "Third Law", isCorrect: false },
    ],
    author: "Anonymous",
    status: "Pending",
  },
  {
    id: 5,
    academicYear: "2025-2026",
    grade: "Class 8",
    subject: "English",
    chapter: "Grammar",
    topic: "Verbs & Nouns",
    questionType: "Fill in the blanks",
    difficulty: "Easy",
    marks: 1,
    cognitiveRating: ["Knowledge"],
    questionText: "The quick brown fox jumps ___ the lazy dog.",
    fillInBlankAnswer: "over",
    author: "Ms. Priya Sharma",
    status: "Pending",
  },
  {
    id: 6,
    academicYear: "2025-2026",
    grade: "Class 9",
    subject: "Science",
    chapter: "Biology",
    topic: "Ecosystems",
    questionType: "One sentence",
    difficulty: "Medium",
    marks: 2,
    cognitiveRating: ["Understanding"],
    questionText: 'Define the term "Ecosystem" in one sentence.',
    modelAnswer:
      "An ecosystem is a geographic area where plants, animals, and other organisms work together to form a bubble of life.",
    author: "Mr. Anil Kumar",
    status: "Pending",
  },
  {
    id: 7,
    academicYear: "2025-2026",
    grade: "Class 10",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    questionType: "Short answer type",
    difficulty: "Medium",
    marks: 3,
    cognitiveRating: ["Application"],
    questionText:
      "Explain the difference between a linear equation and a quadratic equation.",
    modelAnswer:
      "A linear equation has a maximum degree of 1 and forms a straight line on a graph, whereas a quadratic equation has a maximum degree of 2 and forms a parabola.",
    author: "Dr. Sarah Jenkins",
    status: "Pending",
  },
  {
    id: 8,
    academicYear: "2025-2026",
    grade: "Class 12",
    subject: "English",
    chapter: "Literature",
    topic: "Shakespeare",
    questionType: "Long answer type",
    difficulty: "Hard",
    marks: 5,
    cognitiveRating: ["Understanding", "Application"],
    questionText:
      "Analyze the recurring theme of ambition in Macbeth and its moral consequences.",
    modelAnswer:
      "Ambition is the driving force of the play, leading Macbeth to commit regicide and ultimately causing his downfall. It explores the moral consequences of unchecked desire for power overriding personal conscience.",
    author: "Mrs. Linda Brown",
    status: "Pending",
  },
  {
    id: 9,
    academicYear: "2025-2026",
    grade: "Class 11",
    subject: "Science",
    chapter: "Chemistry",
    topic: "Elements",
    questionType: "Match the Pair",
    difficulty: "Medium",
    marks: 4,
    cognitiveRating: ["Knowledge"],
    questionText:
      "Match the following chemical elements with their correct atomic numbers.",
    matchPairs: [
      { left: "Oxygen", right: "8" },
      { left: "Carbon", right: "6" },
      { left: "Gold", right: "79" },
      { left: "Silver", right: "47" },
    ],
    author: "Prof. David Chen",
    status: "Pending",
  },
];

// --- Reusable Multi-Select Dropdown Component ---
const MultiSelectDropdown = ({
  options,
  selected,
  onChange,
  placeholder,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer flex justify-between items-center text-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all"
      >
        <span
          className={
            selected.length
              ? "text-slate-800 font-medium truncate pr-2"
              : "text-slate-400"
          }
        >
          {selected.length > 0
            ? selected.length === 1
              ? options.find((o) => o.value === selected[0])?.label
              : `${selected.length} items selected`
            : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-40 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-64 flex flex-col overflow-hidden animate-fade-in-down">
            {searchable && (
              <div className="p-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                <Search size={16} className="text-slate-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none text-sm font-medium text-slate-700"
                />
              </div>
            )}
            <div className="overflow-y-auto p-1.5 flex-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer text-sm font-medium text-slate-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(opt.value)}
                      onChange={() => toggleOption(opt.value)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    {opt.label}
                  </label>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState("review");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dashboardFilters, setDashboardFilters] = useState({
    grade: "All",
    subject: "All",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfigSuccess, setShowConfigSuccess] = useState(false);

  const [formData, setFormData] = useState({
    academicYear: "2025-2026",
    grade: "",
    subject: "",
    chapter: "",
    topic: "",
    subTopic: "",
    questionText: "",
    difficulty: "",
    questionType: "",
    cognitiveRating: [],
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    trueFalseAnswer: "",
    matchPairs: [
      { left: "", right: "" },
      { left: "", right: "" },
    ],
    fillInBlankAnswer: "",
    modelAnswer: "",
  });

  const [questionTab, setQuestionTab] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [questionSuccess, setQuestionSuccess] = useState({
    show: false,
    isDraft: false,
  });

  const [questions, setQuestions] = useState([...INITIAL_QUESTIONS]);

  const [filters, setFilters] = useState({
    academicYear: "",
    grade: "",
    subject: "",
    chapter: "",
    topic: "",
    difficulty: "",
    questionType: "",
    search: "",
    cognitiveRating: [],
  });
  const [draftFilters, setDraftFilters] = useState({
    grade: "",
    subject: "",
    questionType: "",
  });
  const [reviewFilters, setReviewFilters] = useState({
    academicYear: "",
    grade: "",
    subject: "",
    chapter: "",
    topic: "",
    search: "",
    questionType: "",
    difficulty: "",
    cognitiveRating: [],
  });
  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    questionId: null,
    remark: "",
  });
  const [reviewRatings, setReviewRatings] = useState({});
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const [questionTypesConfig, setQuestionTypesConfig] = useState([
    { id: 1, type: "Multiple Choice", marks: 1 },
    { id: 2, type: "True/False", marks: 1 },
    { id: 3, type: "Fill in the blanks", marks: 1 },
    { id: 4, type: "One sentence", marks: 2 },
    { id: 5, type: "Short answer type", marks: 3 },
    { id: 6, type: "Long answer type", marks: 5 },
    { id: 7, type: "Match the Pair", marks: 4 },
  ]);

  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [topicSearch, setTopicSearch] = useState("");

  // --- View Mode State ---
  const [approvedViewMode, setApprovedViewMode] = useState("table");
  const [reviewViewMode, setReviewViewMode] = useState("table");
  const [isApprovedFiltersOpen, setIsApprovedFiltersOpen] = useState(true);
  const [isReviewFiltersOpen, setIsReviewFiltersOpen] = useState(true);
  const [reviewModalQuestion, setReviewModalQuestion] = useState(null);
  const [approvedModalQuestion, setApprovedModalQuestion] = useState(null);

  // --- Blueprint State ---
  const [blueprintConfig, setBlueprintConfig] = useState({
    subject: "",
    examType: "Annual",
    maxMarks: 80,
    difficulty: [], // [], ["Easy"], ["Medium"], ["Hard"] — multi-select
  });

  const [blueprintData, setBlueprintData] = useState({});
  const [blueprintChapterData, setBlueprintChapterData] = useState({});

  // --- Baseline Data Management State ---
  const [activeBaselineTab, setActiveBaselineTab] = useState("subject");
  const [baselineData, setBaselineData] = useState({
    subjects: [
      { id: 1, grade: "Class 10", name: "Mathematics", code: "041" },
      { id: 2, grade: "Class 10", name: "Science", code: "086" },
      { id: 3, grade: "Class 12", name: "Mathematics", code: "041" },
      { id: 4, grade: "Class 12", name: "Physics", code: "042" },
    ],
    chapters: [
      { id: 1, grade: "Class 10", subject: "Mathematics", name: "Real Numbers", code: "01" },
      { id: 2, grade: "Class 10", subject: "Mathematics", name: "Polynomials", code: "02" },
      { id: 3, grade: "Class 10", subject: "Mathematics", name: "Pair of Linear Equations", code: "03" },
      { id: 4, grade: "Class 10", subject: "Mathematics", name: "Quadratic Equations", code: "04" },
      { id: 5, grade: "Class 10", subject: "Mathematics", name: "Arithmetic Progressions", code: "05" },
      { id: 6, grade: "Class 10", subject: "Mathematics", name: "Triangles", code: "06" },
      { id: 7, grade: "Class 10", subject: "Mathematics", name: "Coordinate Geometry", code: "07" },
      { id: 8, grade: "Class 10", subject: "Mathematics", name: "Intro to Trigonometry", code: "08" },
      { id: 9, grade: "Class 10", subject: "Mathematics", name: "Some Applications of Trigonometry", code: "09" },
      { id: 10, grade: "Class 10", subject: "Mathematics", name: "Circles", code: "10" },
      
      { id: 11, grade: "Class 12", subject: "Mathematics", name: "Relations and Functions", code: "01" },
      { id: 12, grade: "Class 12", subject: "Mathematics", name: "Inverse Trigonometric Functions", code: "02" },
      { id: 13, grade: "Class 12", subject: "Mathematics", name: "Matrices", code: "03" },
      { id: 14, grade: "Class 12", subject: "Mathematics", name: "Determinants", code: "04" },
      { id: 15, grade: "Class 12", subject: "Mathematics", name: "Continuity and Differentiability", code: "05" },
      { id: 16, grade: "Class 12", subject: "Mathematics", name: "Application of Derivatives", code: "06" },
      { id: 17, grade: "Class 12", subject: "Mathematics", name: "Integrals", code: "07" },
      { id: 18, grade: "Class 12", subject: "Mathematics", name: "Application of Integrals", code: "08" },
      { id: 19, grade: "Class 12", subject: "Mathematics", name: "Differential Equations", code: "09" },
      { id: 20, grade: "Class 12", subject: "Mathematics", name: "Vector Algebra", code: "10" },
      { id: 21, grade: "Class 12", subject: "Mathematics", name: "Three Dimensional Geometry", code: "11" },
      { id: 22, grade: "Class 12", subject: "Mathematics", name: "Linear Programming", code: "12" },
      { id: 23, grade: "Class 12", subject: "Mathematics", name: "Probability", code: "13" },
    ],
    topics: [
      // Class 10 Math Topics
      { id: 1, grade: "Class 10", subject: "Mathematics", chapter: "Real Numbers", name: "Euclid's Division Lemma", code: "01" },
      { id: 2, grade: "Class 10", subject: "Mathematics", chapter: "Real Numbers", name: "Fundamental Theorem of Arithmetic", code: "02" },
      { id: 3, grade: "Class 10", subject: "Mathematics", chapter: "Real Numbers", name: "Proof of Irrationality", code: "03" },
      { id: 4, grade: "Class 10", subject: "Mathematics", chapter: "Real Numbers", name: "Decimal Expansions", code: "04" },
      { id: 5, grade: "Class 10", subject: "Mathematics", chapter: "Real Numbers", name: "Revisiting Rational Numbers", code: "05" },

      { id: 6, grade: "Class 10", subject: "Mathematics", chapter: "Polynomials", name: "Geometrical Meaning of Zeroes", code: "01" },
      { id: 7, grade: "Class 10", subject: "Mathematics", chapter: "Polynomials", name: "Zeroes of a Polynomial", code: "02" },
      { id: 8, grade: "Class 10", subject: "Mathematics", chapter: "Polynomials", name: "Relationship between Zeroes and Coefficients", code: "03" },
      { id: 9, grade: "Class 10", subject: "Mathematics", chapter: "Polynomials", name: "Division Algorithm for Polynomials", code: "04" },
      { id: 10, grade: "Class 10", subject: "Mathematics", chapter: "Polynomials", name: "Algebraic Identities", code: "05" },

      { id: 11, grade: "Class 10", subject: "Mathematics", chapter: "Pair of Linear Equations", name: "Graphical Method of Solution", code: "01" },
      { id: 12, grade: "Class 10", subject: "Mathematics", chapter: "Pair of Linear Equations", name: "Algebraic Methods", code: "02" },
      { id: 13, grade: "Class 10", subject: "Mathematics", chapter: "Pair of Linear Equations", name: "Substitution Method", code: "03" },
      { id: 14, grade: "Class 10", subject: "Mathematics", chapter: "Pair of Linear Equations", name: "Elimination Method", code: "04" },
      { id: 15, grade: "Class 10", subject: "Mathematics", chapter: "Pair of Linear Equations", name: "Cross-Multiplication Method", code: "05" },

      { id: 16, grade: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", name: "Standard Form of a Quadratic Equation", code: "01" },
      { id: 17, grade: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", name: "Solution by Factorisation", code: "02" },
      { id: 18, grade: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", name: "Solution by Completing the Square", code: "03" },
      { id: 19, grade: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", name: "Quadratic Formula", code: "04" },
      { id: 20, grade: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", name: "Nature of Roots", code: "05" },

      { id: 21, grade: "Class 10", subject: "Mathematics", chapter: "Arithmetic Progressions", name: "Introduction to AP", code: "01" },
      { id: 22, grade: "Class 10", subject: "Mathematics", chapter: "Arithmetic Progressions", name: "nth Term of an AP", code: "02" },
      { id: 23, grade: "Class 10", subject: "Mathematics", chapter: "Arithmetic Progressions", name: "Sum of First n Terms of an AP", code: "03" },
      { id: 24, grade: "Class 10", subject: "Mathematics", chapter: "Arithmetic Progressions", name: "Word Problems based on AP", code: "04" },
      { id: 25, grade: "Class 10", subject: "Mathematics", chapter: "Arithmetic Progressions", name: "Properties of AP", code: "05" },

      { id: 26, grade: "Class 10", subject: "Mathematics", chapter: "Triangles", name: "Similar Figures", code: "01" },
      { id: 27, grade: "Class 10", subject: "Mathematics", chapter: "Triangles", name: "Similarity of Triangles", code: "02" },
      { id: 28, grade: "Class 10", subject: "Mathematics", chapter: "Triangles", name: "Criteria for Similarity of Triangles", code: "03" },
      { id: 29, grade: "Class 10", subject: "Mathematics", chapter: "Triangles", name: "Areas of Similar Triangles", code: "04" },
      { id: 30, grade: "Class 10", subject: "Mathematics", chapter: "Triangles", name: "Pythagoras Theorem", code: "05" },

      { id: 31, grade: "Class 10", subject: "Mathematics", chapter: "Coordinate Geometry", name: "Distance Formula", code: "01" },
      { id: 32, grade: "Class 10", subject: "Mathematics", chapter: "Coordinate Geometry", name: "Section Formula", code: "02" },
      { id: 33, grade: "Class 10", subject: "Mathematics", chapter: "Coordinate Geometry", name: "Area of a Triangle", code: "03" },
      { id: 34, grade: "Class 10", subject: "Mathematics", chapter: "Coordinate Geometry", name: "Collinear Points", code: "04" },
      { id: 35, grade: "Class 10", subject: "Mathematics", chapter: "Coordinate Geometry", name: "Mid-point Formula", code: "05" },

      { id: 36, grade: "Class 10", subject: "Mathematics", chapter: "Intro to Trigonometry", name: "Trigonometric Ratios", code: "01" },
      { id: 37, grade: "Class 10", subject: "Mathematics", chapter: "Intro to Trigonometry", name: "Trigonometric Ratios of Some Specific Angles", code: "02" },
      { id: 38, grade: "Class 10", subject: "Mathematics", chapter: "Intro to Trigonometry", name: "Trigonometric Ratios of Complementary Angles", code: "03" },
      { id: 39, grade: "Class 10", subject: "Mathematics", chapter: "Intro to Trigonometry", name: "Trigonometric Identities", code: "04" },
      { id: 40, grade: "Class 10", subject: "Mathematics", chapter: "Intro to Trigonometry", name: "Proofs of Trigonometric Identities", code: "05" },

      { id: 41, grade: "Class 10", subject: "Mathematics", chapter: "Some Applications of Trigonometry", name: "Line of Sight", code: "01" },
      { id: 42, grade: "Class 10", subject: "Mathematics", chapter: "Some Applications of Trigonometry", name: "Angles of Elevation", code: "02" },
      { id: 43, grade: "Class 10", subject: "Mathematics", chapter: "Some Applications of Trigonometry", name: "Angles of Depression", code: "03" },
      { id: 44, grade: "Class 10", subject: "Mathematics", chapter: "Some Applications of Trigonometry", name: "Heights and Distances", code: "04" },
      { id: 45, grade: "Class 10", subject: "Mathematics", chapter: "Some Applications of Trigonometry", name: "Real-life Applications", code: "05" },

      { id: 46, grade: "Class 10", subject: "Mathematics", chapter: "Circles", name: "Tangent to a Circle", code: "01" },
      { id: 47, grade: "Class 10", subject: "Mathematics", chapter: "Circles", name: "Number of Tangents from a Point on a Circle", code: "02" },
      { id: 48, grade: "Class 10", subject: "Mathematics", chapter: "Circles", name: "Length of Tangent", code: "03" },
      { id: 49, grade: "Class 10", subject: "Mathematics", chapter: "Circles", name: "Theorems on Tangents", code: "04" },
      { id: 50, grade: "Class 10", subject: "Mathematics", chapter: "Circles", name: "Properties of Circles", code: "05" },

      // Class 12 Math Topics
      { id: 51, grade: "Class 12", subject: "Mathematics", chapter: "Relations and Functions", name: "Types of Relations", code: "01" },
      { id: 52, grade: "Class 12", subject: "Mathematics", chapter: "Relations and Functions", name: "Types of Functions", code: "02" },
      { id: 53, grade: "Class 12", subject: "Mathematics", chapter: "Relations and Functions", name: "Composition of Functions", code: "03" },
      { id: 54, grade: "Class 12", subject: "Mathematics", chapter: "Relations and Functions", name: "Invertible Functions", code: "04" },
      { id: 55, grade: "Class 12", subject: "Mathematics", chapter: "Relations and Functions", name: "Binary Operations", code: "05" },

      { id: 56, grade: "Class 12", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", name: "Basic Concepts", code: "01" },
      { id: 57, grade: "Class 12", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", name: "Properties of Inverse Trigonometric Functions", code: "02" },
      { id: 58, grade: "Class 12", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", name: "Principal Value Branch", code: "03" },
      { id: 59, grade: "Class 12", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", name: "Domain and Range", code: "04" },
      { id: 60, grade: "Class 12", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", name: "Graphs of Inverse Trigonometric Functions", code: "05" },

      { id: 61, grade: "Class 12", subject: "Mathematics", chapter: "Matrices", name: "Order of a Matrix", code: "01" },
      { id: 62, grade: "Class 12", subject: "Mathematics", chapter: "Matrices", name: "Types of Matrices", code: "02" },
      { id: 63, grade: "Class 12", subject: "Mathematics", chapter: "Matrices", name: "Operations on Matrices", code: "03" },
      { id: 64, grade: "Class 12", subject: "Mathematics", chapter: "Matrices", name: "Transpose of a Matrix", code: "04" },
      { id: 65, grade: "Class 12", subject: "Mathematics", chapter: "Matrices", name: "Symmetric and Skew Symmetric Matrices", code: "05" },

      { id: 66, grade: "Class 12", subject: "Mathematics", chapter: "Determinants", name: "Definition of Determinants", code: "01" },
      { id: 67, grade: "Class 12", subject: "Mathematics", chapter: "Determinants", name: "Properties of Determinants", code: "02" },
      { id: 68, grade: "Class 12", subject: "Mathematics", chapter: "Determinants", name: "Area of a Triangle using Determinants", code: "03" },
      { id: 69, grade: "Class 12", subject: "Mathematics", chapter: "Determinants", name: "Minors and Cofactors", code: "04" },
      { id: 70, grade: "Class 12", subject: "Mathematics", chapter: "Determinants", name: "Adjoint and Inverse of a Matrix", code: "05" },

      { id: 71, grade: "Class 12", subject: "Mathematics", chapter: "Continuity and Differentiability", name: "Continuity", code: "01" },
      { id: 72, grade: "Class 12", subject: "Mathematics", chapter: "Continuity and Differentiability", name: "Differentiability", code: "02" },
      { id: 73, grade: "Class 12", subject: "Mathematics", chapter: "Continuity and Differentiability", name: "Derivatives of Composite Functions", code: "03" },
      { id: 74, grade: "Class 12", subject: "Mathematics", chapter: "Continuity and Differentiability", name: "Derivatives of Implicit Functions", code: "04" },
      { id: 75, grade: "Class 12", subject: "Mathematics", chapter: "Continuity and Differentiability", name: "Mean Value Theorem", code: "05" },

      { id: 76, grade: "Class 12", subject: "Mathematics", chapter: "Application of Derivatives", name: "Rate of Change of Quantities", code: "01" },
      { id: 77, grade: "Class 12", subject: "Mathematics", chapter: "Application of Derivatives", name: "Increasing and Decreasing Functions", code: "02" },
      { id: 78, grade: "Class 12", subject: "Mathematics", chapter: "Application of Derivatives", name: "Tangents and Normals", code: "03" },
      { id: 79, grade: "Class 12", subject: "Mathematics", chapter: "Application of Derivatives", name: "Approximations", code: "04" },
      { id: 80, grade: "Class 12", subject: "Mathematics", chapter: "Application of Derivatives", name: "Maxima and Minima", code: "05" },

      { id: 81, grade: "Class 12", subject: "Mathematics", chapter: "Integrals", name: "Integration as Inverse of Differentiation", code: "01" },
      { id: 82, grade: "Class 12", subject: "Mathematics", chapter: "Integrals", name: "Methods of Integration", code: "02" },
      { id: 83, grade: "Class 12", subject: "Mathematics", chapter: "Integrals", name: "Integration by Partial Fractions", code: "03" },
      { id: 84, grade: "Class 12", subject: "Mathematics", chapter: "Integrals", name: "Integration by Parts", code: "04" },
      { id: 85, grade: "Class 12", subject: "Mathematics", chapter: "Integrals", name: "Definite Integrals", code: "05" },

      { id: 86, grade: "Class 12", subject: "Mathematics", chapter: "Application of Integrals", name: "Area under Simple Curves", code: "01" },
      { id: 87, grade: "Class 12", subject: "Mathematics", chapter: "Application of Integrals", name: "Area of the Region Bounded by a Curve and a Line", code: "02" },
      { id: 88, grade: "Class 12", subject: "Mathematics", chapter: "Application of Integrals", name: "Area between Two Curves", code: "03" },
      { id: 89, grade: "Class 12", subject: "Mathematics", chapter: "Application of Integrals", name: "Application of Definite Integrals", code: "04" },
      { id: 90, grade: "Class 12", subject: "Mathematics", chapter: "Application of Integrals", name: "Properties of Definite Integrals", code: "05" },

      { id: 91, grade: "Class 12", subject: "Mathematics", chapter: "Differential Equations", name: "Basic Concepts", code: "01" },
      { id: 92, grade: "Class 12", subject: "Mathematics", chapter: "Differential Equations", name: "General and Particular Solutions", code: "02" },
      { id: 93, grade: "Class 12", subject: "Mathematics", chapter: "Differential Equations", name: "Formation of a Differential Equation", code: "03" },
      { id: 94, grade: "Class 12", subject: "Mathematics", chapter: "Differential Equations", name: "Methods of Solving First Order First Degree", code: "04" },
      { id: 95, grade: "Class 12", subject: "Mathematics", chapter: "Differential Equations", name: "Linear Differential Equations", code: "05" },

      { id: 96, grade: "Class 12", subject: "Mathematics", chapter: "Vector Algebra", name: "Basic Concepts of Vectors", code: "01" },
      { id: 97, grade: "Class 12", subject: "Mathematics", chapter: "Vector Algebra", name: "Types of Vectors", code: "02" },
      { id: 98, grade: "Class 12", subject: "Mathematics", chapter: "Vector Algebra", name: "Addition of Vectors", code: "03" },
      { id: 99, grade: "Class 12", subject: "Mathematics", chapter: "Vector Algebra", name: "Multiplication of a Vector by a Scalar", code: "04" },
      { id: 100, grade: "Class 12", subject: "Mathematics", chapter: "Vector Algebra", name: "Scalar and Cross Product of Vectors", code: "05" },

      { id: 101, grade: "Class 12", subject: "Mathematics", chapter: "Three Dimensional Geometry", name: "Direction Cosines and Direction Ratios", code: "01" },
      { id: 102, grade: "Class 12", subject: "Mathematics", chapter: "Three Dimensional Geometry", name: "Equation of a Line in Space", code: "02" },
      { id: 103, grade: "Class 12", subject: "Mathematics", chapter: "Three Dimensional Geometry", name: "Angle Between Two Lines", code: "03" },
      { id: 104, grade: "Class 12", subject: "Mathematics", chapter: "Three Dimensional Geometry", name: "Shortest Distance Between Two Lines", code: "04" },
      { id: 105, grade: "Class 12", subject: "Mathematics", chapter: "Three Dimensional Geometry", name: "Plane and Its Equations", code: "05" },

      { id: 106, grade: "Class 12", subject: "Mathematics", chapter: "Linear Programming", name: "Mathematical Formulation", code: "01" },
      { id: 107, grade: "Class 12", subject: "Mathematics", chapter: "Linear Programming", name: "Graphical Method of Solving Linear Programming Problems", code: "02" },
      { id: 108, grade: "Class 12", subject: "Mathematics", chapter: "Linear Programming", name: "Different Types of Linear Programming Problems", code: "03" },
      { id: 109, grade: "Class 12", subject: "Mathematics", chapter: "Linear Programming", name: "Optimization", code: "04" },
      { id: 110, grade: "Class 12", subject: "Mathematics", chapter: "Linear Programming", name: "Corner Point Method", code: "05" },

      { id: 111, grade: "Class 12", subject: "Mathematics", chapter: "Probability", name: "Conditional Probability", code: "01" },
      { id: 112, grade: "Class 12", subject: "Mathematics", chapter: "Probability", name: "Multiplication Theorem on Probability", code: "02" },
      { id: 113, grade: "Class 12", subject: "Mathematics", chapter: "Probability", name: "Independent Events", code: "03" },
      { id: 114, grade: "Class 12", subject: "Mathematics", chapter: "Probability", name: "Bayes' Theorem", code: "04" },
      { id: 115, grade: "Class 12", subject: "Mathematics", chapter: "Probability", name: "Random Variables and Probability Distributions", code: "05" },
    ],
    subTopics: [],
  });

  const [baselineForm, setBaselineForm] = useState({
    grade: "",
    subjectName: "",
    subjectCode: "",
    chapterName: "",
    chapterCode: "",
    topicName: "",
    topicCode: "",
    subTopicName: "",
    subTopicCode: "",
  });

  // --- User Access Management State ---
  const [userRolesData, setUserRolesData] = useState({
    moderators: [
      {
        id: 1,
        employees: ["EMP001", "EMP002"],
        classes: ["Class 10"],
        subjects: ["Mathematics", "Science"],
      },
    ],
    contributors: [
      {
        id: 1,
        employees: ["EMP003", "EMP004"],
        classes: ["Class 10", "Class 12"],
        subjects: ["Science", "Physics"],
      },
    ],
  });

  const [roleForm, setRoleForm] = useState({
    classes: [],
    subjects: [],
    employees: [],
    employeeSearch: "",
    searchedEmployee: null,
    searchAttempted: false,
  });

  const employeeOptions = EMPLOYEES.map((emp) => ({
    label: `${emp.name} (${emp.id})`,
    value: emp.id,
  }));
  const classOptions = [8, 9, 10, 11, 12].map((n) => ({
    label: `Class ${n}`,
    value: `Class ${n}`,
  }));

  const availableSubjectsForRole = useMemo(() => {
    if (roleForm.classes.length === 0) return [];
    const validSubjects = baselineData.subjects.filter((s) =>
      roleForm.classes.includes(s.grade),
    );
    const uniqueSubjectNames = [...new Set(validSubjects.map((s) => s.name))];
    return uniqueSubjectNames.map((name) => ({ label: name, value: name }));
  }, [roleForm.classes, baselineData.subjects]);

  useEffect(() => {
    const validSubjValues = availableSubjectsForRole.map((s) => s.value);
    const cleanedSubjects = roleForm.subjects.filter((s) =>
      validSubjValues.includes(s),
    );
    if (cleanedSubjects.length !== roleForm.subjects.length) {
      setRoleForm((prev) => ({ ...prev, subjects: cleanedSubjects }));
    }
  }, [roleForm.classes, availableSubjectsForRole]);

  // --- Filtering Logic ---
  const filteredTopics = useMemo(
    () =>
      TOPICS.filter((t) => t.toLowerCase().includes(topicSearch.toLowerCase())),
    [topicSearch],
  );

  const filteredQuestions = useMemo(
    () =>
      questions.filter((q) => {
        if (q.status !== "Published") return false;
        if (filters.academicYear && q.academicYear !== filters.academicYear)
          return false;
        if (filters.grade && q.grade !== filters.grade) return false;
        if (filters.subject && q.subject !== filters.subject) return false;
        if (filters.chapter && q.chapter !== filters.chapter) return false;
        if (filters.topic && q.topic !== filters.topic) return false;
        if (filters.difficulty && q.difficulty !== filters.difficulty)
          return false;
        if (filters.questionType && q.questionType !== filters.questionType)
          return false;

        if (filters.cognitiveRating && filters.cognitiveRating.length > 0) {
          const qRating = Array.isArray(q.cognitiveRating)
            ? q.cognitiveRating
            : q.cognitiveRating
              ? [q.cognitiveRating]
              : [];
          const hasMatch = filters.cognitiveRating.some((r) =>
            qRating.includes(r),
          );
          if (!hasMatch) return false;
        }

        if (filters.search) {
          const query = filters.search.toLowerCase();
          const searchableText =
            `${q.questionText || ""} ${q.author || ""} ${q.topic || ""} ${q.subTopic || ""} ${q.chapter || ""}`.toLowerCase();
          if (!searchableText.includes(query)) return false;
        }
        return true;
      }),
    [questions, filters],
  );

  const filteredDrafts = useMemo(() => {
    return questions.filter((q) => {
      if (q.status !== "Draft") return false;
      if (draftFilters.grade && q.grade !== draftFilters.grade) return false;
      if (draftFilters.subject && q.subject !== draftFilters.subject)
        return false;
      if (
        draftFilters.questionType &&
        q.questionType !== draftFilters.questionType
      )
        return false;
      return true;
    });
  }, [questions, draftFilters]);

  const filteredPendingQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.status !== "Pending") return false;
      if (
        reviewFilters.academicYear &&
        q.academicYear !== reviewFilters.academicYear
      )
        return false;
      if (reviewFilters.grade && q.grade !== reviewFilters.grade) return false;
      if (reviewFilters.subject && q.subject !== reviewFilters.subject)
        return false;
      if (reviewFilters.chapter && q.chapter !== reviewFilters.chapter)
        return false;
      if (reviewFilters.topic && q.topic !== reviewFilters.topic) return false;
      if (
        reviewFilters.questionType &&
        q.questionType !== reviewFilters.questionType
      )
        return false;
      if (reviewFilters.difficulty && q.difficulty !== reviewFilters.difficulty)
        return false;

      if (
        reviewFilters.cognitiveRating &&
        reviewFilters.cognitiveRating.length > 0
      ) {
        const qRating = Array.isArray(q.cognitiveRating)
          ? q.cognitiveRating
          : q.cognitiveRating
            ? [q.cognitiveRating]
            : [];
        const hasMatch = reviewFilters.cognitiveRating.some((r) =>
          qRating.includes(r),
        );
        if (!hasMatch) return false;
      }

      if (reviewFilters.search) {
        const query = reviewFilters.search.toLowerCase();
        const searchableText =
          `${q.questionText || ""} ${q.author || ""} ${q.topic || ""} ${q.subTopic || ""} ${q.chapter || ""}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }
      return true;
    });
  }, [questions, reviewFilters]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "subject" && { chapter: "" }),
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleCorrectOptionSelect = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      })),
    }));
  };

  const handleAddOption = () =>
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { text: "", isCorrect: false }],
    }));
  const handleRemoveOption = (index) =>
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));

  const handlePairChange = (index, side, value) => {
    const newPairs = [...formData.matchPairs];
    newPairs[index][side] = value;
    setFormData((prev) => ({ ...prev, matchPairs: newPairs }));
  };
  const handleAddPair = () =>
    setFormData((prev) => ({
      ...prev,
      matchPairs: [...prev.matchPairs, { left: "", right: "" }],
    }));
  const handleRemovePair = (index) =>
    setFormData((prev) => ({
      ...prev,
      matchPairs: prev.matchPairs.filter((_, i) => i !== index),
    }));

  const handleConfigMarksChange = (id, newMarks) =>
    setQuestionTypesConfig((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, marks: Number(newMarks) } : item,
      ),
    );

  const handleFilterChange = (e) =>
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "subject" && { chapter: "" }),
    }));
  const handleDraftFilterChange = (e) =>
    setDraftFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleReviewFilterChange = (e) =>
    setReviewFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "subject" && { chapter: "" }),
    }));
  const handleDashboardFilterChange = (e) =>
    setDashboardFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleRatingChange = (id, val) =>
    setReviewRatings((prev) => ({
      ...prev,
      [id]: { ...prev[id], rating: val },
    }));
  const handleRatingHover = (id, val) =>
    setReviewRatings((prev) => ({
      ...prev,
      [id]: { ...prev[id], hover: val },
    }));
  const toggleExpandAnswer = (id) =>
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleUpdateStatus = (id, newStatus) => {
    const rating = reviewRatings[id]?.rating || 0;
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus, rating } : q)),
    );
  };

  const handleOpenRejectModal = (id) =>
    setRejectModal({ isOpen: true, questionId: id, remark: "" });
  const handleCloseRejectModal = () =>
    setRejectModal({ isOpen: false, questionId: null, remark: "" });
  const handleSubmitRejection = () => {
    const rating = reviewRatings[rejectModal.questionId]?.rating || 0;
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === rejectModal.questionId
          ? { ...q, status: "Rejected", remark: rejectModal.remark, rating }
          : q,
      ),
    );
    handleCloseRejectModal();
  };

  const handleSaveQuestion = (e, isDraft = false) => {
    e.preventDefault();
    const newStatus = isDraft ? "Draft" : "Pending";
    const marks =
      questionTypesConfig.find((c) => c.type === formData.questionType)
        ?.marks || 1;

    if (editingId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingId
            ? {
                ...q,
                ...formData,
                marks,
                status: newStatus,
              }
            : q,
        ),
      );
    } else {
      const newQuestion = {
        id: Date.now(),
        ...formData,
        marks,
        author: "Anonymous",
        status: newStatus,
      };
      setQuestions((prev) => [newQuestion, ...prev]);
    }

    setQuestionSuccess({ show: true, isDraft });
    setTimeout(() => {
      setQuestionSuccess({ show: false, isDraft: false });
      setFormData({
        academicYear: "2025-2026",
        grade: "",
        subject: "",
        chapter: "",
        topic: "",
        subTopic: "",
        questionText: "",
        difficulty: "",
        questionType: "",
        cognitiveRating: [],
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        trueFalseAnswer: "",
        matchPairs: [
          { left: "", right: "" },
          { left: "", right: "" },
        ],
        fillInBlankAnswer: "",
        modelAnswer: "",
      });
      setEditingId(null);
      if (isDraft) setQuestionTab("drafts");
    }, 2000);
  };

  const handleResumeDraft = (draft) => {
    setFormData({
      academicYear: draft.academicYear || "2025-2026",
      grade: draft.grade || "",
      subject: draft.subject || "",
      chapter: draft.chapter || "",
      topic: draft.topic || "",
      subTopic: draft.subTopic || "",
      questionText: draft.questionText || "",
      difficulty: draft.difficulty || "",
      questionType: draft.questionType || "",
      cognitiveRating: Array.isArray(draft.cognitiveRating)
        ? draft.cognitiveRating
        : draft.cognitiveRating
          ? [draft.cognitiveRating]
          : [],
      options: draft.options || [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      trueFalseAnswer: draft.trueFalseAnswer || "",
      matchPairs: draft.matchPairs || [
        { left: "", right: "" },
        { left: "", right: "" },
      ],
      fillInBlankAnswer: draft.fillInBlankAnswer || "",
      modelAnswer: draft.modelAnswer || "",
    });
    setEditingId(draft.id);
    setQuestionTab("create");
  };

  const handleDeleteDraft = (id) =>
    setQuestions((prev) => prev.filter((q) => q.id !== id));

  const handleSaveConfig = () => {
    setShowConfigSuccess(true);
    setTimeout(() => setShowConfigSuccess(false), 2000);
  };

  const handleBaselineInputChange = (e) => {
    const { name, value } = e.target;
    setBaselineForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "grade") {
        next.subjectName = "";
        next.chapterName = "";
        next.topicName = "";
      }
      if (name === "subjectName") {
        next.chapterName = "";
        next.topicName = "";
      }
      if (name === "chapterName") {
        next.topicName = "";
      }
      return next;
    });
  };

  const getMasterCodePreview = () => {
    if (
      !baselineForm.grade ||
      !baselineForm.subjectName ||
      !baselineForm.chapterName ||
      !baselineForm.topicName ||
      !baselineForm.subTopicCode
    )
      return "Awaiting Inputs...";
    const cCode = baselineForm.grade.replace("Class ", "");
    const sCode =
      baselineData.subjects.find(
        (s) =>
          s.grade === baselineForm.grade && s.name === baselineForm.subjectName,
      )?.code || "???";
    const chCode =
      baselineData.chapters.find(
        (c) =>
          c.grade === baselineForm.grade &&
          c.subject === baselineForm.subjectName &&
          c.name === baselineForm.chapterName,
      )?.code || "???";
    const tCode =
      baselineData.topics.find(
        (t) =>
          t.grade === baselineForm.grade &&
          t.subject === baselineForm.subjectName &&
          t.chapter === baselineForm.chapterName &&
          t.name === baselineForm.topicName,
      )?.code || "???";
    return `${cCode}-${sCode}-${chCode}-${tCode}-${baselineForm.subTopicCode}`;
  };

  const handleAddBaselineItem = (e, type) => {
    e.preventDefault();
    const id = Date.now();

    setBaselineData((prev) => {
      const next = { ...prev };
      if (type === "subject") {
        next.subjects = [
          ...prev.subjects,
          {
            id,
            grade: baselineForm.grade,
            name: baselineForm.subjectName,
            code: baselineForm.subjectCode,
          },
        ];
        setBaselineForm((f) => ({ ...f, subjectName: "", subjectCode: "" }));
      } else if (type === "chapter") {
        next.chapters = [
          ...prev.chapters,
          {
            id,
            grade: baselineForm.grade,
            subject: baselineForm.subjectName,
            name: baselineForm.chapterName,
            code: baselineForm.chapterCode,
          },
        ];
        setBaselineForm((f) => ({ ...f, chapterName: "", chapterCode: "" }));
      } else if (type === "topic") {
        next.topics = [
          ...prev.topics,
          {
            id,
            grade: baselineForm.grade,
            subject: baselineForm.subjectName,
            chapter: baselineForm.chapterName,
            name: baselineForm.topicName,
            code: baselineForm.topicCode,
          },
        ];
        setBaselineForm((f) => ({ ...f, topicName: "", topicCode: "" }));
      } else if (type === "subTopic") {
        next.subTopics = [
          ...prev.subTopics,
          {
            id,
            grade: baselineForm.grade,
            subject: baselineForm.subjectName,
            chapter: baselineForm.chapterName,
            topic: baselineForm.topicName,
            name: baselineForm.subTopicName,
            code: baselineForm.subTopicCode,
            masterCode: getMasterCodePreview(),
          },
        ];
        setBaselineForm((f) => ({ ...f, subTopicName: "", subTopicCode: "" }));
      }
      return next;
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleSaveRole = (e, roleType, searchedEmp = null) => {
    if (e) e.preventDefault();
    
    const finalEmployees = searchedEmp ? [searchedEmp.id] : roleForm.employees;

    if (
      roleForm.classes.length === 0 ||
      roleForm.subjects.length === 0 ||
      finalEmployees.length === 0
    )
      return;

    setUserRolesData((prev) => ({
      ...prev,
      [roleType]: [
        ...prev[roleType],
        { 
          id: Date.now(), 
          ...roleForm, 
          employees: finalEmployees 
        },
      ],
    }));

    setRoleForm({
      classes: [],
      subjects: [],
      employees: [],
      employeeSearch: "",
      searchedEmployee: null,
      searchAttempted: false,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // --- Mock Data Generators ---
  const getDashboardData = () => {
    const gradeMultiplier = dashboardFilters.grade === "All" ? 1 : 0.3;
    const subjectMultiplier = dashboardFilters.subject === "All" ? 1 : 0.4;
    const multiplier = gradeMultiplier * subjectMultiplier;

    let baseCoverage = [
      {
        subject: "Mathematics",
        count: Math.floor(450 * multiplier),
        color: "bg-blue-500",
      },
      {
        subject: "Science",
        count: Math.floor(380 * multiplier),
        color: "bg-emerald-500",
      },
      {
        subject: "English",
        count: Math.floor(290 * multiplier),
        color: "bg-amber-500",
      },
    ];

    if (dashboardFilters.subject !== "All") {
      baseCoverage = baseCoverage.filter(
        (c) => c.subject === dashboardFilters.subject,
      );
      if (baseCoverage.length === 0) {
        baseCoverage = [
          {
            subject: dashboardFilters.subject,
            count: Math.floor(150 * multiplier),
            color: "bg-indigo-500",
          },
        ];
      }
    }

    const seed =
      (dashboardFilters.grade.length + dashboardFilters.subject.length) % 3;
    const bloomVariations = [
      { knowledge: 45, understanding: 35, application: 20 },
      { knowledge: 30, understanding: 50, application: 20 },
      { knowledge: 60, understanding: 25, application: 15 },
    ];

    let syllabusCoverage = 74;
    if (dashboardFilters.subject !== "All") {
      const coverages = { Mathematics: 88, Science: 65, English: 92 };
      syllabusCoverage = coverages[dashboardFilters.subject] || 50;
    }
    if (dashboardFilters.grade !== "All") {
      const gradeOffset =
        (parseInt(dashboardFilters.grade.replace("Class ", "")) || 10) - 10;
      syllabusCoverage = Math.min(
        100,
        Math.max(0, syllabusCoverage + gradeOffset * 4),
      );
    }

    return {
      totalApproved: Math.floor(1248 * multiplier),
      pendingReviews: Math.floor(
        questions.filter((q) => q.status === "Pending").length +
          34 * multiplier,
      ),
      rejectionRate:
        dashboardFilters.grade === "All"
          ? dashboardFilters.subject === "All"
            ? 8.5
            : 4.2
          : 6.2,
      syllabusCoverage: syllabusCoverage,
      coverage: baseCoverage,
      blooms: bloomVariations[seed],
      difficulty: {
        easy: {
          count: Math.floor(520 * multiplier),
          percent: seed === 0 ? 42 : seed === 1 ? 30 : 50,
        },
        medium: {
          count: Math.floor(480 * multiplier),
          percent: seed === 0 ? 38 : seed === 1 ? 50 : 30,
        },
        hard: {
          count: Math.floor(248 * multiplier),
          percent: seed === 0 ? 20 : 20,
        },
      },
      questionTypeDistribution: [
        {
          type: "Multiple Choice",
          count: Math.floor(410 * multiplier),
          color: "bg-indigo-500",
        },
        {
          type: "Short answer type",
          count: Math.floor(280 * multiplier),
          color: "bg-blue-500",
        },
        {
          type: "True/False",
          count: Math.floor(210 * multiplier),
          color: "bg-emerald-500",
        },
        {
          type: "One sentence",
          count: Math.floor(150 * multiplier),
          color: "bg-amber-500",
        },
        {
          type: "Match the Pair",
          count: Math.floor(80 * multiplier),
          color: "bg-purple-500",
        },
        {
          type: "Long answer type",
          count: Math.floor(65 * multiplier),
          color: "bg-red-500",
        },
        {
          type: "Fill in the blanks",
          count: Math.floor(53 * multiplier),
          color: "bg-teal-500",
        },
      ],
    };
  };

  const getPerformanceData = () => {
    const gradeMultiplier = dashboardFilters.grade === "All" ? 1 : 0.3;
    const subjectMultiplier = dashboardFilters.subject === "All" ? 1 : 0.4;
    const multiplier = gradeMultiplier * subjectMultiplier;

    const seed =
      (dashboardFilters.grade.length + dashboardFilters.subject.length) % 3;
    const baseAccuracy = seed === 0 ? 68 : seed === 1 ? 74 : 62;

    let topics = [];
    if (
      dashboardFilters.subject !== "All" &&
      SUBJECTS[dashboardFilters.subject]
    ) {
      topics = SUBJECTS[dashboardFilters.subject].map((t, i) => ({
        topic: t,
        accuracy: Math.max(
          30,
          Math.min(95, baseAccuracy + (i % 2 === 0 ? 15 : -18) + seed * 5),
        ),
      }));
    } else {
      topics = TOPICS.slice(0, 5).map((t, i) => ({
        topic: t,
        accuracy: Math.max(
          30,
          Math.min(95, baseAccuracy + (i % 2 === 0 ? 12 : -22) + seed * 3),
        ),
      }));
    }
    topics.sort((a, b) => a.accuracy - b.accuracy);

    const publishedCount = Math.floor(1248 * multiplier);
    const attemptedCount = Math.floor(publishedCount * (0.82 + seed * 0.05));

    return {
      publishedQuestions: publishedCount,
      attemptedQuestions: attemptedCount,
      avgAccuracy: baseAccuracy + 3.2,
      flaggedQuestions: seed === 0 ? 14 : seed === 1 ? 8 : 27,
      difficultyPerformance: [
        { level: "Easy", actual: 82 },
        { level: "Medium", actual: 58 },
        { level: "Hard", actual: 45 },
      ],
      topicMastery: topics,
      cognitive: [
        { rating: "Knowledge", accuracy: baseAccuracy + 18 },
        { rating: "Understanding", accuracy: baseAccuracy + 5 },
        { rating: "Application", accuracy: baseAccuracy - 12.5 },
      ],
      types: [
        { type: "Multiple Choice", accuracy: baseAccuracy + 15 },
        { type: "True/False", accuracy: baseAccuracy + 22 },
        { type: "Match the Pair", accuracy: baseAccuracy + 8 },
        { type: "Short answer type", accuracy: baseAccuracy - 5 },
        { type: "Long answer type", accuracy: baseAccuracy - 25 },
      ],
    };
  };

  const dashData = getDashboardData();
  const perfData = getPerformanceData();

  const activeApprovedFiltersCount =
    [
      filters.academicYear,
      filters.grade,
      filters.subject,
      filters.chapter,
      filters.topic,
      filters.difficulty,
      filters.questionType,
      filters.search,
    ].filter(Boolean).length + (filters.cognitiveRating?.length || 0);
  const activeReviewFiltersCount =
    [
      reviewFilters.academicYear,
      reviewFilters.grade,
      reviewFilters.subject,
      reviewFilters.chapter,
      reviewFilters.topic,
      reviewFilters.questionType,
      reviewFilters.difficulty,
      reviewFilters.search,
    ].filter(Boolean).length + (reviewFilters.cognitiveRating?.length || 0);

  const handleBlueprintQuestionChange = (topicId, typeId, delta) => {
    setBlueprintData((prev) => {
      const topicData = prev[topicId] || { targetMarks: 0, questions: {} };
      const currentCount = topicData.questions[typeId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const newQuestions = { ...topicData.questions, [typeId]: newCount };

      // Auto-calculate total marks for this topic from all question types
      let newTopicTotal = 0;
      Object.entries(newQuestions).forEach(([qTypeId, count]) => {
        const qType = questionTypesConfig.find(t => t.id === parseInt(qTypeId));
        if (qType) newTopicTotal += qType.marks * (count as number);
      });

      return {
        ...prev,
        [topicId]: {
          ...topicData,
          questions: newQuestions,
          targetMarks: newTopicTotal, // auto-update; reflects live allocation
        }
      };
    });
  };

  const handleBlueprintTargetMarksChange = (topicId, marks) => {
    setBlueprintData((prev) => {
      const topicData = prev[topicId] || { targetMarks: 0, manualMax: 0, questions: {} };
      return {
        ...prev,
        [topicId]: {
          ...topicData,
          manualMax: parseInt(marks) || 0  // separate from auto-calculated targetMarks
        }
      };
    });
  };

  const handleBlueprintChapterMarksChange = (chapterId, marks) => {
    setBlueprintChapterData((prev) => ({
      ...prev,
      [chapterId]: {
        ...(prev[chapterId] || {}),
        targetMarks: parseInt(marks) || 0
      }
    }));
  };

  const handleBlueprintChapterPercentChange = (chapterId, percentStr, maxMarks) => {
    const percent = parseFloat(percentStr) || 0;
    const marks = Math.round((percent / 100) * maxMarks);
    setBlueprintChapterData((prev) => ({
      ...prev,
      [chapterId]: {
        ...(prev[chapterId] || {}),
        targetMarks: marks
      }
    }));
  };

  const calculateTopicMarks = (topicId) => {
    const topicData = blueprintData[topicId];
    if (!topicData || !topicData.questions) return 0;
    let total = 0;
    Object.entries(topicData.questions).forEach(([typeId, count]) => {
      const qType = questionTypesConfig.find(t => t.id === parseInt(typeId));
      if (qType) total += (qType.marks * count);
    });
    return total;
  };

  const calculateTotalAllocatedMarks = () => {
    let total = 0;
    Object.keys(blueprintData).forEach(topicId => {
      total += calculateTopicMarks(topicId);
    });
    return total;
  };

  const calculateTotalAllocatedQuestions = () => {
    let total = 0;
    Object.values(blueprintData).forEach(topicData => {
      if (topicData.questions) {
        Object.values(topicData.questions).forEach(count => {
          total += count;
        });
      }
    });
    return total;
  };

  const [expandedBlueprintChapters, setExpandedBlueprintChapters] = useState<Record<number, boolean>>({});
  const toggleBlueprintChapter = (chapterId) => {
    setExpandedBlueprintChapters(prev => ({
      ...prev,
      [chapterId]: prev[chapterId] === false ? true : false
    }));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <div
          className={`h-16 flex items-center border-b border-slate-800 overflow-hidden ${isSidebarCollapsed ? "justify-center" : "px-6"}`}
        >
          <BookOpen className="text-blue-500 shrink-0" size={24} />
          {!isSidebarCollapsed && (
            <h1 className="text-lg font-bold text-white tracking-wide ml-3 whitespace-nowrap">
              Talent Development Program
            </h1>
          )}
        </div>

        <div
          className={`p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider ${isSidebarCollapsed ? "text-center" : ""}`}
        >
          {isSidebarCollapsed ? "---" : "Dashboard"}
        </div>

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto pb-4">
          <button
            onClick={() => setActiveMenu("dashboard")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "dashboard" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Question Bank Overview</span>}
          </button>
          <button
            onClick={() => setActiveMenu("performance")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "performance" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Activity size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Student Performance</span>}
          </button>

          {/* Baseline Data Section */}
          <div className="pt-4 pb-1">
            <div
              className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider ${isSidebarCollapsed ? "text-center" : "px-3"}`}
            >
              {isSidebarCollapsed ? "Data" : "Baseline Data"}
            </div>
          </div>
          <button
            onClick={() => setActiveMenu("baseline")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "baseline" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Database size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Curriculum Setup</span>}
          </button>
          <button
            onClick={() => setActiveMenu("questionTypes")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "questionTypes" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Settings size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Question Types</span>}
          </button>
          <button
            onClick={() => setActiveMenu("blueprint")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "blueprint" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Layers size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Blueprint</span>}
          </button>

          {/* User Access Management Section */}
          <div className="pt-4 pb-1">
            <div
              className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider ${isSidebarCollapsed ? "text-center" : "px-3"}`}
            >
              {isSidebarCollapsed ? "Users" : "Access Control"}
            </div>
          </div>
          <button
            onClick={() => {
              setActiveMenu("addModerators");
              setRoleForm({ classes: [], subjects: [], employees: [] });
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "addModerators" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <ShieldCheck size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Add Moderators</span>}
          </button>
          <button
            onClick={() => {
              setActiveMenu("addContributors");
              setRoleForm({ classes: [], subjects: [], employees: [] });
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "addContributors" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Users size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Add Contributors</span>}
          </button>

          {/* Question Bank Section */}
          <div className="pt-4 pb-1">
            <div
              className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider ${isSidebarCollapsed ? "text-center" : "px-3"}`}
            >
              {isSidebarCollapsed ? "Questions" : "Question Bank"}
            </div>
          </div>
          <button
            onClick={() => setActiveMenu("questionBank")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "questionBank" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <Plus size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Add Question</span>}
          </button>
          <button
            onClick={() => setActiveMenu("review")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "review" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <div className="relative">
              <ClipboardCheck size={18} className="shrink-0" />
              {questions.filter((q) => q.status === "Pending").length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
              )}
            </div>
            {!isSidebarCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Review Queue</span>
                {questions.filter((q) => q.status === "Pending").length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {questions.filter((q) => q.status === "Pending").length}
                  </span>
                )}
              </div>
            )}
          </button>
          <button
            onClick={() => setActiveMenu("approved")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg transition-colors ${activeMenu === "approved" ? "bg-blue-600/10 text-blue-400 font-medium" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <CheckCircle2 size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span>Approved Questions</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-50">
        <header className="bg-white border-b border-slate-200 shrink-0 z-10">
          <div className="px-8 h-16 flex items-center gap-4">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {activeMenu === "dashboard"
                ? "Question Bank Overview"
                : activeMenu === "performance"
                  ? "Student Performance Analysis"
                  : activeMenu === "baseline"
                    ? "Baseline Data Management"
                    : activeMenu === "addModerators"
                      ? "Assign Moderators"
                      : activeMenu === "addContributors"
                        ? "Assign Contributors"
                        : activeMenu === "questionBank"
                          ? "Add New Question"
                          : activeMenu === "approved"
                            ? "Approved Bank"
                            : activeMenu === "review"
                              ? "Review & Moderation"
                              : "Question Types Configuration"}
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-32">
          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Filter size={18} />
                  <span>Global Filter:</span>
                </div>
                <select
                  name="grade"
                  value={dashboardFilters.grade}
                  onChange={handleDashboardFilterChange}
                  className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Classes</option>
                  {[8, 9, 10, 11, 12].map((n) => (
                    <option key={n} value={`Class ${n}`}>
                      Class {n}
                    </option>
                  ))}
                </select>
                <select
                  name="subject"
                  value={dashboardFilters.subject}
                  onChange={handleDashboardFilterChange}
                  className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Subjects</option>
                  {Object.keys(SUBJECTS).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <Layers size={22} />
                    </div>
                    <span className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100 flex items-center gap-1">
                      <TrendingUp size={14} className="text-emerald-500" /> +12%
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Total Approved
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {dashData.totalApproved}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                      <ClipboardCheck size={22} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Pending Reviews
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {dashData.pendingReviews}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <BookOpen size={22} />
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      Target 100%
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Syllabus Coverage
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {dashData.syllabusCoverage}%
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                      <XCircle size={22} />
                    </div>
                    <span className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100 flex items-center gap-1">
                      <TrendingDown size={14} className="text-emerald-500" />{" "}
                      -2.1%
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Modification Rate
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {dashData.rejectionRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <BarChart3 className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Coverage by Subject
                    </h3>
                  </div>
                  <div className="space-y-5 mt-2">
                    {dashData.coverage.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-semibold text-slate-600">
                            {item.subject}
                          </span>
                          <span className="text-slate-400 font-medium">
                            {item.count} questions
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div
                            className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: `${(item.count / Math.max(...dashData.coverage.map((c) => c.count))) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <PieChart className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Bloom's Taxonomy Balance
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                    <div
                      className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000"
                      style={{
                        background: `conic-gradient(#3b82f6 0% ${dashData.blooms.knowledge}%, #10b981 ${dashData.blooms.knowledge}% ${dashData.blooms.knowledge + dashData.blooms.understanding}%, #f59e0b ${dashData.blooms.knowledge + dashData.blooms.understanding}% 100%)`,
                      }}
                    >
                      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                        <span className="text-xs text-slate-400 font-medium">
                          Total
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                          100%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-semibold text-slate-600 w-24">
                          Knowledge
                        </span>
                        <span className="text-sm text-slate-500">
                          {dashData.blooms.knowledge}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-semibold text-slate-600 w-24">
                          Understanding
                        </span>
                        <span className="text-sm text-slate-500">
                          {dashData.blooms.understanding}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm font-semibold text-slate-600 w-24">
                          Application
                        </span>
                        <span className="text-sm text-slate-500">
                          {dashData.blooms.application}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <BrainCircuit className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Difficulty Distribution
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5 mt-2">
                    {Object.entries(dashData.difficulty).map(
                      ([level, data]) => (
                        <div key={level} className="relative">
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase ${level === "easy" ? "text-emerald-700 bg-emerald-100" : level === "medium" ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100"}`}
                            >
                              {level}
                            </span>
                            <span className="text-sm font-semibold text-slate-700">
                              {data.count} questions
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 mb-1 mt-2">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ease-out ${level === "easy" ? "bg-emerald-500" : level === "medium" ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${data.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <FileQuestion className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Question Type Distribution
                    </h3>
                  </div>
                  <div className="space-y-5 mt-2">
                    {dashData.questionTypeDistribution.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-semibold text-slate-600">
                            {item.type}
                          </span>
                          <span className="text-slate-400 font-medium">
                            {item.count}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div
                            className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: `${(item.count / Math.max(...dashData.questionTypeDistribution.map((c) => c.count))) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PERFORMANCE ANALYSIS DASHBOARD */}
          {activeMenu === "performance" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Filter size={18} />
                  <span>Global Filter:</span>
                </div>
                <select
                  name="grade"
                  value={dashboardFilters.grade}
                  onChange={handleDashboardFilterChange}
                  className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Classes</option>
                  {[8, 9, 10, 11, 12].map((n) => (
                    <option key={n} value={`Class ${n}`}>
                      Class {n}
                    </option>
                  ))}
                </select>
                <select
                  name="subject"
                  value={dashboardFilters.subject}
                  onChange={handleDashboardFilterChange}
                  className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Subjects</option>
                  {Object.keys(SUBJECTS).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <Layers size={22} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Published Questions
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {perfData.publishedQuestions.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                      <FileQuestion size={22} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Questions Attempted
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {perfData.attemptedQuestions.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <Target size={22} />
                    </div>
                    <span className="bg-slate-50 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100">
                      All Exams
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Avg. Accuracy Rate
                    </h4>
                    <p className="text-3xl font-bold text-slate-800">
                      {perfData.avgAccuracy.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle size={22} />
                    </div>
                    <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                      &lt; 30% Success
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">
                      Flagged Questions
                    </h4>
                    <p className="text-3xl font-bold text-red-600">
                      {perfData.flaggedQuestions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <BarChart className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Actual Difficulty Metrics
                    </h3>
                  </div>
                  <div className="space-y-6 mt-2">
                    {perfData.difficultyPerformance.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-md uppercase text-[11px] ${item.level === "Easy" ? "bg-emerald-100 text-emerald-700" : item.level === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}
                          >
                            {item.level}
                          </span>
                          <span className="text-sm font-semibold text-slate-700">
                            Actual: {item.actual}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 relative">
                          <div
                            className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out ${item.level === "Easy" ? "bg-[#f59e0b]" : item.level === "Medium" ? "bg-[#f59e0b]" : "bg-[#10b981]"}`}
                            style={{ width: `${item.actual}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <Layers className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Topic-wise Mastery (Bottom 5)
                    </h3>
                  </div>
                  <div className="space-y-5 mt-2">
                    {perfData.topicMastery.slice(0, 5).map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-semibold text-slate-600 truncate pr-4">
                            {item.topic}
                          </span>
                          <span
                            className={`font-bold ${item.accuracy < 50 ? "text-red-500" : item.accuracy < 70 ? "text-amber-500" : "text-emerald-500"}`}
                          >
                            {item.accuracy.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${item.accuracy < 50 ? "bg-red-500" : item.accuracy < 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${item.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <BrainCircuit className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Performance by Cognitive Rating
                    </h3>
                  </div>
                  <div className="flex h-48 mt-2">
                    <div className="flex flex-col justify-between text-xs text-slate-400 font-medium pr-4 pb-6">
                      <span>100</span>
                      <span>50</span>
                      <span>0</span>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 pb-6 flex flex-col justify-between pointer-events-none z-0">
                        <div className="w-full border-t border-slate-200 border-dashed"></div>
                        <div className="w-full border-t border-slate-200 border-dashed"></div>
                        <div className="w-full border-t border-slate-300"></div>
                      </div>
                      <div className="absolute inset-0 pb-6 flex items-end justify-around z-10">
                        {perfData.cognitive.map((item, idx) => (
                          <div
                            key={idx}
                            className="w-16 h-full flex flex-col justify-end group relative"
                          >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.accuracy.toFixed(0)}%
                            </span>
                            <div className="w-full bg-slate-50 rounded-t-[14px] flex items-end h-full overflow-hidden">
                              <div
                                className={`w-full rounded-t-[14px] transition-all duration-1000 ease-out ${idx === 0 ? "bg-[#3b82f6]" : idx === 1 ? "bg-[#10b981]" : "bg-[#f59e0b]"}`}
                                style={{ height: `${item.accuracy}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-around items-end">
                        {perfData.cognitive.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold text-slate-600 w-16 text-center"
                          >
                            {item.rating}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <FileQuestion className="text-blue-500" size={20} />
                    <h3 className="font-semibold text-slate-800">
                      Format Efficacy (Accuracy by Type)
                    </h3>
                  </div>
                  <div className="mt-2">
                    <div className="relative">
                      <div className="absolute top-0 bottom-0 left-[140px] right-0 flex justify-between pointer-events-none z-0">
                        <div className="w-px h-full bg-slate-100"></div>
                        <div className="w-px h-full bg-slate-100"></div>
                        <div className="w-px h-full bg-slate-100"></div>
                        <div className="w-px h-full bg-slate-100"></div>
                        <div className="w-px h-full bg-slate-100"></div>
                      </div>
                      <div className="space-y-5 relative z-10 py-1">
                        {perfData.types
                          .sort((a, b) => b.accuracy - a.accuracy)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 group cursor-default"
                            >
                              <div className="w-[124px] text-xs font-semibold text-slate-600 text-right shrink-0">
                                {item.type}
                              </div>
                              <div className="flex-1 bg-slate-50 rounded-full h-4 relative">
                                <div
                                  className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-1000 ease-out ${item.accuracy < 50 ? "bg-[#f87171]" : "bg-[#7c72ff]"}`}
                                  style={{ width: `${item.accuracy}%` }}
                                ></div>
                                <span className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md z-10">
                                  {item.accuracy.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-200">
                      <div className="w-[124px] shrink-0"></div>
                      <div className="flex-1 flex justify-between text-[10px] font-medium text-slate-400">
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BASELINE DATA MANAGEMENT */}
          {activeMenu === "baseline" && (
            <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold text-sm">
                      Baseline configuration added successfully!
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white p-2 rounded-[20px] shadow-sm border border-slate-100 flex gap-2 overflow-x-auto">
                {["subject", "chapter", "topic", "subTopic"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveBaselineTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-colors flex-1 ${activeBaselineTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {tab.replace("subTopic", "Sub-Topic")}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-5 pb-3 border-b border-slate-50 flex items-center gap-2">
                      <Plus size={18} className="text-blue-500" />
                      Add New{" "}
                      {activeBaselineTab.replace("subTopic", "Sub-Topic")}
                    </h3>

                    <form
                      onSubmit={(e) =>
                        handleAddBaselineItem(e, activeBaselineTab)
                      }
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end"
                    >
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase">
                          Class <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="grade"
                          value={baselineForm.grade}
                          onChange={handleBaselineInputChange}
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select Class</option>
                          {[8, 9, 10, 11, 12].map((n) => (
                            <option key={n} value={`Class ${n}`}>
                              Class {n}
                            </option>
                          ))}
                        </select>
                      </div>

                      {["chapter", "topic", "subTopic"].includes(
                        activeBaselineTab,
                      ) && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="subjectName"
                            value={baselineForm.subjectName}
                            onChange={handleBaselineInputChange}
                            required
                            disabled={!baselineForm.grade}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                          >
                            <option value="">
                              {baselineForm.grade
                                ? "Select Subject"
                                : "Select Class First"}
                            </option>
                            {baselineData.subjects
                              .filter((s) => s.grade === baselineForm.grade)
                              .map((s) => (
                                <option key={s.id} value={s.name}>
                                  {s.name} ({s.code})
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      {["topic", "subTopic"].includes(activeBaselineTab) && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">
                            Chapter <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="chapterName"
                            value={baselineForm.chapterName}
                            onChange={handleBaselineInputChange}
                            required
                            disabled={!baselineForm.subjectName}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                          >
                            <option value="">
                              {baselineForm.subjectName
                                ? "Select Chapter"
                                : "Select Subject First"}
                            </option>
                            {baselineData.chapters
                              .filter(
                                (c) =>
                                  c.grade === baselineForm.grade &&
                                  c.subject === baselineForm.subjectName,
                              )
                              .map((c) => (
                                <option key={c.id} value={c.name}>
                                  {c.name} ({c.code})
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      {activeBaselineTab === "subTopic" && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">
                            Topic <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="topicName"
                            value={baselineForm.topicName}
                            onChange={handleBaselineInputChange}
                            required
                            disabled={!baselineForm.chapterName}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                          >
                            <option value="">
                              {baselineForm.chapterName
                                ? "Select Topic"
                                : "Select Chapter First"}
                            </option>
                            {baselineData.topics
                              .filter(
                                (t) =>
                                  t.grade === baselineForm.grade &&
                                  t.subject === baselineForm.subjectName &&
                                  t.chapter === baselineForm.chapterName,
                              )
                              .map((t) => (
                                <option key={t.id} value={t.name}>
                                  {t.name} ({t.code})
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase">
                          {activeBaselineTab.replace("subTopic", "Sub-Topic")}{" "}
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name={`${activeBaselineTab}Name`}
                          value={baselineForm[`${activeBaselineTab}Name`]}
                          onChange={handleBaselineInputChange}
                          required
                          placeholder={`Enter ${activeBaselineTab.replace("subTopic", "sub-topic")} name`}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase">
                          {activeBaselineTab.replace("subTopic", "Sub-Topic")}{" "}
                          Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name={`${activeBaselineTab}Code`}
                          value={baselineForm[`${activeBaselineTab}Code`]}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            handleBaselineInputChange({
                              target: { name: e.target.name, value: val },
                            });
                          }}
                          maxLength={activeBaselineTab === "subject" ? 3 : 2}
                          required
                          placeholder={`e.g., ${activeBaselineTab === "subject" ? "123" : "01"}`}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2 h-[42px]"
                      >
                        <Save size={16} /> Save{" "}
                        {activeBaselineTab.replace("subTopic", "Sub-Topic")}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="w-full">
                  <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Database size={18} className="text-blue-500" />
                        Existing{" "}
                        {activeBaselineTab.replace("subTopic", "Sub-Topics")}s
                      </h3>
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {baselineData[`${activeBaselineTab}s`].length} Total
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="p-4 py-3">Class</th>
                            {["chapter", "topic", "subTopic"].includes(
                              activeBaselineTab,
                            ) && <th className="p-4 py-3">Subject</th>}
                            {["topic", "subTopic"].includes(
                              activeBaselineTab,
                            ) && <th className="p-4 py-3">Chapter</th>}
                            {activeBaselineTab === "subTopic" && (
                              <th className="p-4 py-3">Topic</th>
                            )}
                            <th className="p-4 py-3">
                              {activeBaselineTab.replace(
                                "subTopic",
                                "Sub-Topic",
                              )}{" "}
                              Name
                            </th>
                            <th className="p-4 py-3 text-right">Code</th>
                            <th className="p-4 py-3 text-center w-12"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                          {baselineData[`${activeBaselineTab}s`].map((item) => {
                            const getSubjCode = () =>
                              baselineData.subjects.find(
                                (s) =>
                                  s.grade === item.grade &&
                                  s.name === item.subject,
                              )?.code || "???";
                            const getChapCode = () =>
                              baselineData.chapters.find(
                                (c) =>
                                  c.grade === item.grade &&
                                  c.subject === item.subject &&
                                  c.name === item.chapter,
                              )?.code || "???";
                            const getTopCode = () =>
                              baselineData.topics.find(
                                (t) =>
                                  t.grade === item.grade &&
                                  t.subject === item.subject &&
                                  t.chapter === item.chapter &&
                                  t.name === item.topic,
                              )?.code || "???";

                            return (
                              <tr
                                key={item.id}
                                className="hover:bg-slate-50/50 transition-colors"
                              >
                                <td className="p-4 font-medium text-slate-600">
                                  {item.grade}
                                </td>
                                {["chapter", "topic", "subTopic"].includes(
                                  activeBaselineTab,
                                ) && (
                                  <td className="p-4 text-slate-500">
                                    {item.subject}{" "}
                                    <span className="text-slate-400 text-xs font-mono ml-1">
                                      ({getSubjCode()})
                                    </span>
                                  </td>
                                )}
                                {["topic", "subTopic"].includes(
                                  activeBaselineTab,
                                ) && (
                                  <td className="p-4 text-slate-500">
                                    {item.chapter}{" "}
                                    <span className="text-slate-400 text-xs font-mono ml-1">
                                      ({getChapCode()})
                                    </span>
                                  </td>
                                )}
                                {activeBaselineTab === "subTopic" && (
                                  <td className="p-4 text-slate-500">
                                    {item.topic}{" "}
                                    <span className="text-slate-400 text-xs font-mono ml-1">
                                      ({getTopCode()})
                                    </span>
                                  </td>
                                )}
                                <td className="p-4 font-semibold text-slate-800">
                                  {item.name}
                                </td>
                                <td className="p-4 text-right">
                                  {activeBaselineTab === "subTopic" ? (
                                    <span className="font-mono text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                                      {item.masterCode}
                                    </span>
                                  ) : (
                                    <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                                      {item.code}
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={16} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                          {baselineData[`${activeBaselineTab}s`].length ===
                            0 && (
                            <tr>
                              <td
                                colSpan="7"
                                className="p-8 text-center text-slate-400 text-sm"
                              >
                                No data found for this category.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USER ACCESS MANAGEMENT: MODERATORS & CONTRIBUTORS */}
          {(activeMenu === "addModerators" ||
            activeMenu === "addContributors") && (
            <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in-down">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold text-sm">
                      Access scope assigned successfully!
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-6 pb-3 border-b border-slate-50 flex items-center gap-2">
                  {activeMenu === "addModerators" ? (
                    <ShieldCheck size={20} className="text-blue-500" />
                  ) : (
                    <Users size={20} className="text-blue-500" />
                  )}
                  Assign{" "}
                  {activeMenu === "addModerators" ? "Moderator" : "Contributor"}{" "}
                  Access
                </h3>

                {/* Step 1: Search bar */}
                <div className="space-y-1.5 mb-6">
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Search Employee
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={roleForm.employeeSearch || ""}
                        onChange={(e) =>
                          setRoleForm((prev) => ({ ...prev, employeeSearch: e.target.value }))
                        }
                        placeholder="Type employee name or ID..."
                        className="w-full pl-9 pr-4 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const query = (roleForm.employeeSearch || "").toLowerCase().trim();
                        const result = EMPLOYEES.find(
                          (e) =>
                            e.name.toLowerCase().includes(query) ||
                            e.id.toLowerCase().includes(query)
                        );
                        setRoleForm((prev) => ({ ...prev, searchedEmployee: result || null, searchAttempted: true }));
                      }}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shrink-0"
                    >
                      <Search size={16} /> Search
                    </button>
                  </div>
                </div>

                {/* Step 2: Employee result card */}
                {roleForm.searchAttempted && (
                  roleForm.searchedEmployee ? (
                    <div className="border border-blue-100 bg-blue-50/40 rounded-2xl p-5 mb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                            {roleForm.searchedEmployee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-base">{roleForm.searchedEmployee.name}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{roleForm.searchedEmployee.designation}</p>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              {roleForm.searchedEmployee.office}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-white border border-blue-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {roleForm.searchedEmployee.id}
                        </span>
                      </div>

                      {/* Scope selectors inside card */}
                      <div className="mt-5 pt-5 border-t border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">
                            Scope: Classes <span className="text-red-500">*</span>
                          </label>
                          <MultiSelectDropdown
                            options={classOptions}
                            selected={roleForm.classes}
                            onChange={(selected) =>
                              setRoleForm((prev) => ({ ...prev, classes: selected }))
                            }
                            placeholder="Select assigned classes"
                            searchable={false}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase flex justify-between">
                            <span>Scope: Subjects <span className="text-red-500">*</span></span>
                            {roleForm.classes.length === 0 && (
                              <span className="text-[10px] text-amber-500 normal-case">(Select class first)</span>
                            )}
                          </label>
                          <div className={roleForm.classes.length === 0 ? "opacity-50 pointer-events-none" : ""}>
                            <MultiSelectDropdown
                              options={availableSubjectsForRole}
                              selected={roleForm.subjects}
                              onChange={(selected) =>
                                setRoleForm((prev) => ({ ...prev, subjects: selected }))
                              }
                              placeholder={roleForm.classes.length === 0 ? "Awaiting class..." : "Search and select subjects"}
                              searchable={true}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Grant Access button on the card */}
                      <div className="mt-5 flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            handleSaveRole(
                              e,
                              activeMenu === "addModerators"
                                ? "moderators"
                                : "contributors",
                              roleForm.searchedEmployee
                            );
                          }}
                          disabled={
                            roleForm.classes.length === 0 ||
                            roleForm.subjects.length === 0
                          }
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors text-sm flex items-center gap-2"
                        >
                          <UserCheck size={16} /> Grant{" "}
                          {activeMenu === "addModerators"
                            ? "Moderator"
                            : "Contributor"}{" "}
                          Access
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-200 bg-slate-50 rounded-2xl p-8 mb-6 text-center">
                      <User size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-slate-500 font-medium text-sm">No employee found</p>
                      <p className="text-slate-400 text-xs mt-1">Try a different name or employee ID.</p>
                    </div>
                  )
                )}
              </div>

              <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    Currently Assigned{" "}
                    {activeMenu === "addModerators"
                      ? "Moderators"
                      : "Contributors"}
                  </h3>
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {
                      userRolesData[
                        activeMenu === "addModerators"
                          ? "moderators"
                          : "contributors"
                      ].length
                    }{" "}
                    Scopes Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="p-4 py-3">Employee(s)</th>
                        <th className="p-4 py-3">Class Scope</th>
                        <th className="p-4 py-3">Subject Scope</th>
                        <th className="p-4 py-3 text-center w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {userRolesData[
                        activeMenu === "addModerators"
                          ? "moderators"
                          : "contributors"
                      ].map((role) => (
                        <tr
                          key={role.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              {role.employees.map((empId) => {
                                const emp = EMPLOYEES.find(
                                  (e) => e.id === empId,
                                );
                                return (
                                  <span
                                    key={empId}
                                    className="font-semibold text-slate-800"
                                  >
                                    {emp ? emp.name : empId}{" "}
                                    <span className="text-slate-400 font-normal text-xs ml-1">
                                      ({empId})
                                    </span>
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1.5">
                              {role.classes.map((c) => (
                                <span
                                  key={c}
                                  className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-slate-200"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1.5">
                              {role.subjects.map((s) => (
                                <span
                                  key={s}
                                  className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-blue-100"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                              title="Edit Scope"
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {userRolesData[
                        activeMenu === "addModerators"
                          ? "moderators"
                          : "contributors"
                      ].length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="p-8 text-center text-slate-400 text-sm"
                          >
                            No active role assignments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ADD QUESTION FORM */}
          {activeMenu === "questionBank" && (
            <div className="max-w-4xl mx-auto animate-fade-in pb-12">
              <div className="flex justify-center mb-8">
                <div className="bg-slate-200/60 p-1 rounded-xl inline-flex relative shadow-inner">
                  <button
                    onClick={() => {
                      setQuestionTab("create");
                      setEditingId(null);
                      setFormData({
                        academicYear: "2025-2026",
                        grade: "",
                        subject: "",
                        chapter: "",
                        topic: "",
                        subTopic: "",
                        questionText: "",
                        difficulty: "",
                        questionType: "",
                        cognitiveRating: [],
                        options: [
                          { text: "", isCorrect: false },
                          { text: "", isCorrect: false },
                        ],
                        trueFalseAnswer: "",
                        matchPairs: [
                          { left: "", right: "" },
                          { left: "", right: "" },
                        ],
                        fillInBlankAnswer: "",
                        modelAnswer: "",
                      });
                    }}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${questionTab === "create" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    <Plus size={16} />{" "}
                    {editingId ? "Return to Create New" : "Create New"}
                  </button>
                  <button
                    onClick={() => setQuestionTab("drafts")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${questionTab === "drafts" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    <Edit size={16} /> Saved Drafts
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${questionTab === "drafts" ? "bg-blue-100 text-blue-700" : "bg-slate-300 text-slate-600"}`}
                    >
                      {questions.filter((q) => q.status === "Draft").length}
                    </span>
                  </button>
                </div>
              </div>

              {questionSuccess.show && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in-down">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold">
                      {questionSuccess.isDraft
                        ? "Draft saved successfully!"
                        : "Question saved successfully!"}
                    </p>
                    <p className="text-sm">
                      {questionSuccess.isDraft
                        ? "You can resume editing it from the Saved Drafts tab."
                        : "It has been sent for review."}
                    </p>
                  </div>
                </div>
              )}

              {questionTab === "drafts" && (
                <div className="space-y-4 animate-fade-in">
                  {questions.filter((q) => q.status === "Draft").length > 0 && (
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-slate-500 font-medium px-2">
                        <Filter size={16} />{" "}
                        <span className="text-sm hidden sm:inline">
                          Filter Drafts:
                        </span>
                      </div>
                      <select
                        name="grade"
                        value={draftFilters.grade}
                        onChange={handleDraftFilterChange}
                        className="flex-1 min-w-[120px] p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Classes</option>
                        {[8, 9, 10, 11, 12].map((n) => (
                          <option key={n} value={`Class ${n}`}>
                            Class {n}
                          </option>
                        ))}
                      </select>
                      <select
                        name="subject"
                        value={draftFilters.subject}
                        onChange={handleDraftFilterChange}
                        className="flex-1 min-w-[120px] p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Subjects</option>
                        {Object.keys(SUBJECTS).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <select
                        name="questionType"
                        value={draftFilters.questionType}
                        onChange={handleDraftFilterChange}
                        className="flex-1 min-w-[140px] p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Formats</option>
                        {questionTypesConfig.map((t) => (
                          <option key={t.id} value={t.type}>
                            {t.type}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {questions.filter((q) => q.status === "Draft").length ===
                  0 ? (
                    <div className="bg-white p-12 rounded-[20px] border border-slate-200 text-center text-slate-500 shadow-sm">
                      <FileQuestion
                        size={40}
                        className="mx-auto text-slate-300 mb-3"
                      />
                      <h4 className="text-lg font-medium text-slate-800 mb-1">
                        No saved drafts
                      </h4>
                      <p className="text-sm">
                        Start creating a new question to see your drafts here.
                      </p>
                    </div>
                  ) : filteredDrafts.length === 0 ? (
                    <div className="bg-white p-12 rounded-[20px] border border-slate-200 text-center text-slate-500 shadow-sm">
                      <Filter
                        size={40}
                        className="mx-auto text-slate-300 mb-3"
                      />
                      <h4 className="text-lg font-medium text-slate-800 mb-1">
                        No matches found
                      </h4>
                      <p className="text-sm">
                        We couldn't find any drafts matching your selected
                        filters.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredDrafts.map((draft) => (
                        <div
                          key={draft.id}
                          className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                                {draft.grade || "No Class"}
                              </span>
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                {draft.subject || "No Subject"}
                              </span>
                            </div>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold rounded uppercase tracking-wider">
                              Draft
                            </span>
                          </div>

                          <div className="flex-1 mb-5">
                            <h4 className="text-slate-800 font-medium text-[15px] leading-snug line-clamp-2">
                              {draft.questionText || (
                                <span className="italic text-slate-400 font-normal">
                                  No question text provided yet...
                                </span>
                              )}
                            </h4>

                            {draft.questionType === "Multiple Choice" &&
                              draft.options?.some((o) => o.text) && (
                                <div className="mt-3 space-y-1.5">
                                  {draft.options
                                    .filter((o) => o.text)
                                    .slice(0, 2)
                                    .map((opt, i) => (
                                      <div
                                        key={i}
                                        className="text-xs text-slate-500 flex items-center gap-2 truncate"
                                      >
                                        <div
                                          className={`w-3 h-3 rounded-full border flex-shrink-0 ${opt.isCorrect ? "border-green-500 bg-green-100" : "border-slate-300"}`}
                                        ></div>
                                        <span className="truncate">
                                          {opt.text}
                                        </span>
                                      </div>
                                    ))}
                                  {draft.options.filter((o) => o.text).length >
                                    2 && (
                                    <div className="text-[10px] text-slate-400 font-medium pl-5">
                                      +{" "}
                                      {draft.options.filter((o) => o.text)
                                        .length - 2}{" "}
                                      more options
                                    </div>
                                  )}
                                </div>
                              )}

                            {(draft.questionType ||
                              draft.difficulty ||
                              (draft.cognitiveRating &&
                                draft.cognitiveRating.length > 0)) && (
                              <div className="flex flex-wrap items-center gap-2 mt-4">
                                {draft.questionType && (
                                  <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                                    <CheckSquare size={12} />{" "}
                                    {draft.questionType}
                                  </span>
                                )}
                                {draft.difficulty && (
                                  <span
                                    className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-md ${
                                      draft.difficulty === "Hard"
                                        ? "bg-red-50 text-red-600"
                                        : draft.difficulty === "Medium"
                                          ? "bg-amber-50 text-amber-600"
                                          : "bg-emerald-50 text-emerald-600"
                                    }`}
                                  >
                                    {draft.difficulty}
                                  </span>
                                )}
                                {draft.cognitiveRating &&
                                  draft.cognitiveRating.length > 0 && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                                      <BrainCircuit size={12} />{" "}
                                      {draft.cognitiveRating.join(", ")}
                                    </span>
                                  )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                            <button
                              onClick={() => handleResumeDraft(draft)}
                              className="flex-1 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-all flex justify-center items-center gap-2 shadow-sm"
                            >
                              <Edit size={16} /> Resume
                            </button>
                            <button
                              onClick={() => handleDeleteDraft(draft.id)}
                              className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {questionTab === "create" && (
                <form className="space-y-6 animate-fade-in">
                  <section className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                      <Layers className="text-blue-600" size={20} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        1. Context Selection & Type
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                          Syllabus Mapping
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Academic Year{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="academicYear"
                              value={formData.academicYear}
                              onChange={handleInputChange}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                              <option value="2025-2026">2025-2026</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Class <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="grade"
                              value={formData.grade}
                              onChange={handleInputChange}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                              <option value="">Select Class</option>
                              {[8, 9, 10, 11, 12].map((n) => (
                                <option key={n} value={`Class ${n}`}>
                                  Class {n}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Subject <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                              <option value="">Select Subject</option>
                              {Object.keys(SUBJECTS).map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Chapter <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="chapter"
                              value={formData.chapter}
                              onChange={handleInputChange}
                              disabled={!formData.subject}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                            >
                              <option value="">
                                {formData.subject
                                  ? "Select Chapter"
                                  : "Select Subject First"}
                              </option>
                              {formData.subject &&
                                SUBJECTS[formData.subject].map((c) => (
                                  <option key={c} value={c}>
                                    {c}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="space-y-1.5 relative">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Topic <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setIsTopicDropdownOpen(!isTopicDropdownOpen)
                              }
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between outline-none focus:ring-2 focus:ring-blue-500 text-sm text-left"
                            >
                              <span
                                className={
                                  formData.topic
                                    ? "text-slate-800 truncate pr-2"
                                    : "text-slate-400"
                                }
                              >
                                {formData.topic || "Search & Select Topic"}
                              </span>
                              <ChevronDown
                                size={16}
                                className="text-slate-400 shrink-0"
                              />
                            </button>
                            {isTopicDropdownOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                                <div className="p-2 border-b flex items-center gap-2">
                                  <Search
                                    size={16}
                                    className="text-slate-400"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full outline-none text-sm"
                                    value={topicSearch}
                                    onChange={(e) =>
                                      setTopicSearch(e.target.value)
                                    }
                                    autoFocus
                                  />
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                  {filteredTopics.map((t) => (
                                    <div
                                      key={t}
                                      className="p-2.5 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer"
                                      onClick={() => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          topic: t,
                                        }));
                                        setIsTopicDropdownOpen(false);
                                      }}
                                    >
                                      {t}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase">
                              Sub-topic
                            </label>
                            <input
                              type="text"
                              name="subTopic"
                              value={formData.subTopic}
                              onChange={handleInputChange}
                              placeholder="Optional"
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1.5 mb-3">
                          <CheckSquare size={14} className="text-blue-500" />{" "}
                          Question Format{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {questionTypesConfig.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() =>
                                handleInputChange({
                                  target: {
                                    name: "questionType",
                                    value: t.type,
                                  },
                                })
                              }
                              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                                formData.questionType === t.type
                                  ? "bg-blue-50 border-blue-600 text-blue-700 shadow-[0_0_0_1px_rgba(37,99,235,1)]"
                                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              {t.type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                      <Type className="text-blue-600" size={20} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        2. Question Content
                      </h3>
                    </div>
                    <div className="border border-slate-300 rounded-lg overflow-hidden mb-6 focus-within:ring-2 focus-within:ring-blue-500 transition-all shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1 overflow-x-auto">
                        <button
                          type="button"
                          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors shrink-0"
                          title="Bold"
                        >
                          <Bold size={16} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors shrink-0"
                          title="Italic"
                        >
                          <Italic size={16} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors shrink-0"
                          title="Underline"
                        >
                          <Underline size={16} />
                        </button>

                        <div className="w-px h-5 bg-slate-300 mx-1.5 shrink-0"></div>

                        <button
                          type="button"
                          className="px-2 py-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors flex items-center gap-1.5 shrink-0"
                          title="Insert Math Equation"
                        >
                          <Sigma size={16} />{" "}
                          <span className="text-xs font-semibold hidden sm:inline">
                            Equation
                          </span>
                        </button>

                        <div className="w-px h-5 bg-slate-300 mx-1.5 shrink-0"></div>

                        <button
                          type="button"
                          className="px-2 py-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors flex items-center gap-1.5 shrink-0"
                          title="Upload Image"
                        >
                          <ImageIcon size={16} />{" "}
                          <span className="text-xs font-semibold hidden sm:inline">
                            Image
                          </span>
                        </button>
                      </div>
                      <textarea
                        name="questionText"
                        value={formData.questionText}
                        onChange={handleInputChange}
                        placeholder="Type your question..."
                        className="w-full min-h-[120px] p-4 outline-none text-sm text-slate-800 resize-y"
                      ></textarea>
                    </div>

                    {formData.questionType === "Multiple Choice" && (
                      <div className="space-y-4 mb-4">
                        <label className="text-sm font-medium text-slate-700 block">
                          Answer Options * (Select the correct one)
                        </label>
                        {formData.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={opt.isCorrect}
                              onChange={() => handleCorrectOptionSelect(i)}
                              className="w-5 h-5 cursor-pointer text-blue-600"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) =>
                                handleOptionChange(i, e.target.value)
                              }
                              placeholder={`Option ${i + 1}`}
                              className={`flex-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${opt.isCorrect ? "bg-blue-50/50 border-blue-400" : "bg-slate-50 border-slate-300"}`}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(i)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddOption}
                          className="text-blue-600 font-medium flex items-center gap-1 text-sm mt-2 hover:text-blue-700"
                        >
                          <Plus size={16} /> Add Option
                        </button>
                      </div>
                    )}
                    {formData.questionType === "True/False" && (
                      <div className="space-y-3 mb-4">
                        <label className="text-sm font-medium text-slate-700 block">
                          Correct Answer *
                        </label>
                        <div className="flex gap-4">
                          <label
                            className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.trueFalseAnswer === "true" ? "bg-green-50 border-green-500 text-green-700" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                          >
                            <input
                              type="radio"
                              name="trueFalseAnswer"
                              value="true"
                              checked={formData.trueFalseAnswer === "true"}
                              onChange={handleInputChange}
                              className="mr-2 w-4 h-4 text-green-600"
                            />
                            <span className="font-semibold text-lg">True</span>
                          </label>
                          <label
                            className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.trueFalseAnswer === "false" ? "bg-red-50 border-red-500 text-red-700" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                          >
                            <input
                              type="radio"
                              name="trueFalseAnswer"
                              value="false"
                              checked={formData.trueFalseAnswer === "false"}
                              onChange={handleInputChange}
                              className="mr-2 w-4 h-4 text-green-600"
                            />
                            <span className="font-semibold text-lg">False</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {formData.questionType === "Fill in the blanks" && (
                      <div className="space-y-3 mb-4">
                        <label className="text-sm font-medium text-slate-700 block">
                          Expected Answer (for the blank) *
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                          Tip: Use three underscores (___) in the question text
                          above to indicate where the blank is.
                        </p>
                        <input
                          type="text"
                          name="fillInBlankAnswer"
                          value={formData.fillInBlankAnswer || ""}
                          onChange={handleInputChange}
                          placeholder="Type the correct word or phrase..."
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {formData.questionType === "Match the Pair" && (
                      <div className="space-y-4 mb-4">
                        <label className="text-sm font-medium text-slate-700 block">
                          Matching Pairs *
                        </label>
                        {formData.matchPairs.map((pair, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input
                              type="text"
                              value={pair.left}
                              onChange={(e) =>
                                handlePairChange(i, "left", e.target.value)
                              }
                              placeholder={`Item A${i + 1}`}
                              className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                            />
                            <span className="text-slate-400 font-bold">-</span>
                            <input
                              type="text"
                              value={pair.right}
                              onChange={(e) =>
                                handlePairChange(i, "right", e.target.value)
                              }
                              placeholder={`Match B${i + 1}`}
                              className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePair(i)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddPair}
                          className="text-blue-600 font-medium flex items-center gap-1 text-sm mt-2 hover:text-blue-700"
                        >
                          <Plus size={16} /> Add Pair
                        </button>
                      </div>
                    )}

                    {[
                      "One sentence",
                      "Short answer type",
                      "Long answer type",
                    ].includes(formData.questionType) && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex justify-between">
                          <span>Model Answer / Evaluation Rubric</span>
                          <span className="text-slate-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <textarea
                          name="modelAnswer"
                          value={formData.modelAnswer}
                          onChange={handleInputChange}
                          placeholder="Expected answer..."
                          className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                    )}
                  </section>

                  <section className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                      <Hash className="text-blue-600" size={20} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        3. Metadata
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:divide-x md:divide-slate-200">
                      <div className="space-y-3 md:pr-8">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 h-5">
                          Difficulty Level{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-3">
                          {["Easy", "Medium", "Hard"].map((lvl) => {
                            const isSelected = formData.difficulty === lvl;
                            let activeClass = "";
                            let hoverClass = "";

                            if (lvl === "Easy") {
                              activeClass =
                                "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-[0_0_0_1px_rgba(16,185,129,1)]";
                              hoverClass =
                                "hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700";
                            } else if (lvl === "Medium") {
                              activeClass =
                                "bg-amber-50 border-amber-500 text-amber-700 shadow-[0_0_0_1px_rgba(245,158,11,1)]";
                              hoverClass =
                                "hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-700";
                            } else {
                              activeClass =
                                "bg-red-50 border-red-500 text-red-700 shadow-[0_0_0_1px_rgba(239,68,68,1)]";
                              hoverClass =
                                "hover:border-red-300 hover:bg-red-50/50 hover:text-red-700";
                            }

                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    difficulty: lvl,
                                  }))
                                }
                                className={`flex-1 px-2 sm:px-4 h-11 flex items-center justify-center rounded-xl text-sm font-semibold transition-all border ${
                                  isSelected
                                    ? activeClass
                                    : `bg-white border-slate-200 text-slate-600 ${hoverClass}`
                                }`}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-3 md:pl-8">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 h-5">
                          <BrainCircuit size={14} className="text-blue-500" />{" "}
                          Cognitive Rating (Bloom's){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          {["Knowledge", "Understanding", "Application"].map(
                            (lvl) => {
                              const isSelected =
                                formData.cognitiveRating.includes(lvl);
                              return (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => {
                                      const current =
                                        prev.cognitiveRating || [];
                                      const updated = current.includes(lvl)
                                        ? current.filter((item) => item !== lvl)
                                        : [...current, lvl];
                                      return {
                                        ...prev,
                                        cognitiveRating: updated,
                                      };
                                    });
                                  }}
                                  className={`flex-1 px-1 sm:px-3 h-11 flex items-center justify-center gap-1.5 rounded-xl text-[11px] sm:text-sm font-semibold transition-all border ${
                                    isSelected
                                      ? "bg-blue-50 border-blue-600 text-blue-700 shadow-[0_0_0_1px_rgba(37,99,235,1)]"
                                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check
                                      size={14}
                                      className="text-blue-600 shrink-0 hidden lg:block"
                                    />
                                  )}
                                  <span className="truncate">{lvl}</span>
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </form>
              )}
            </div>
          )}

          {/* APPROVED QUESTIONS */}
          {activeMenu === "approved" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <button
                  onClick={() =>
                    setIsApprovedFiltersOpen(!isApprovedFiltersOpen)
                  }
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Filter className="text-blue-500" size={20} />
                    <h3 className="text-lg font-bold text-slate-800">
                      Filter Approved Questions
                    </h3>
                    {activeApprovedFiltersCount > 0 && (
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-blue-100">
                        {activeApprovedFiltersCount} Active
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${isApprovedFiltersOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {isApprovedFiltersOpen && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        name="academicYear"
                        value={filters.academicYear}
                        onChange={handleFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Academic Years</option>
                        <option value="2025-2026">2025-2026</option>
                      </select>
                      <select
                        name="grade"
                        value={filters.grade}
                        onChange={handleFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Classes</option>
                        {[8, 9, 10, 11, 12].map((n) => (
                          <option key={n} value={`Class ${n}`}>
                            Class {n}
                          </option>
                        ))}
                      </select>
                      <select
                        name="subject"
                        value={filters.subject}
                        onChange={handleFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Subjects</option>
                        {Object.keys(SUBJECTS).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <select
                        name="chapter"
                        value={filters.chapter}
                        onChange={handleFilterChange}
                        disabled={!filters.subject}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 disabled:bg-slate-50 disabled:opacity-70"
                      >
                        <option value="">
                          {filters.subject
                            ? "All Chapters"
                            : "Select Subject First"}
                        </option>
                        {filters.subject &&
                          SUBJECTS[filters.subject].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                      </select>
                      <select
                        name="topic"
                        value={filters.topic}
                        onChange={handleFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Topics</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <select
                        name="questionType"
                        value={filters.questionType}
                        onChange={handleFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All question types</option>
                        {questionTypesConfig.map((t) => (
                          <option key={t.id} value={t.type}>
                            {t.type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search questions, topics, authors..."
                        className="w-full pl-10 p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      />
                    </div>

                    <div className="pt-4 pb-2 flex flex-col lg:flex-row gap-6 lg:gap-8">
                      <div className="flex-1 space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                          Difficulty Level
                        </span>
                        <div className="flex gap-3">
                          {["Easy", "Medium", "Hard"].map((diff) => (
                            <button
                              key={diff}
                              type="button"
                              onClick={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  difficulty:
                                    prev.difficulty === diff ? "" : diff,
                                }))
                              }
                              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${filters.difficulty === diff ? "bg-blue-50 border-blue-500 text-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,1)]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                              {diff}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="hidden lg:block w-px bg-slate-100 self-stretch my-2"></div>
                      <div className="flex-[1.5] space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <BrainCircuit size={14} className="text-blue-500" />{" "}
                          Cognitive Rating (Bloom's)
                        </span>
                        <div className="flex gap-3">
                          {["Knowledge", "Understanding", "Application"].map(
                            (cog) => {
                              const isActive =
                                filters.cognitiveRating?.includes(cog);
                              return (
                                <button
                                  key={cog}
                                  type="button"
                                  onClick={() => {
                                    setFilters((prev) => {
                                      const current =
                                        prev.cognitiveRating || [];
                                      const updated = current.includes(cog)
                                        ? current.filter((c) => c !== cog)
                                        : [...current, cog];
                                      return {
                                        ...prev,
                                        cognitiveRating: updated,
                                      };
                                    });
                                  }}
                                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${isActive ? "bg-blue-50 border-blue-500 text-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,1)]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                                >
                                  {cog}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-700">
                  Showing {filteredQuestions.length} approved questions
                </h4>
                <div className="bg-slate-200/60 p-1 rounded-xl flex gap-1">
                  <button
                    onClick={() => setApprovedViewMode("grid")}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${approvedViewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                  >
                    <LayoutGrid size={16} />
                    Grid
                  </button>
                  <button
                    onClick={() => setApprovedViewMode("table")}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${approvedViewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                  >
                    <List size={16} />
                    Table
                  </button>
                </div>
              </div>

              {approvedViewMode === "grid" ? (
                <div className="space-y-10">
                  {Object.entries(
                    filteredQuestions.reduce((acc, q) => {
                      const groupKey = `${q.grade || "No Class"} • ${q.subject || "No Subject"}`;
                      if (!acc[groupKey]) acc[groupKey] = [];
                      acc[groupKey].push(q);
                      return acc;
                    }, {}),
                  ).map(([groupKey, groupQuestions]) => (
                    <div key={groupKey} className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-3 flex items-center gap-3">
                        {groupKey}
                        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {groupQuestions.length}
                        </span>
                      </h4>

                      <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x px-1 -mx-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100/50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 transition-colors">
                        {groupQuestions.map((q) => (
                          <div
                            key={q.id}
                            className="bg-white rounded-[24px] shadow-sm border border-emerald-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative min-w-[340px] w-[340px] shrink-0 snap-start"
                          >
                            <div className="p-6 flex flex-col flex-1">
                              <div className="flex justify-between items-start mb-4">
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                                  <CheckCircle2 size={10} /> Approved
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium italic truncate max-w-[100px]">
                                  by {q.author}
                                </span>
                              </div>
                              <h4 className="text-slate-800 font-semibold text-base mb-4 flex-1 line-clamp-3">
                                {q.questionText}
                              </h4>

                              {/* Answer Preview */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 relative transition-all">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Answer
                                  </span>
                                  {((q.questionType === "Multiple Choice" &&
                                    q.options?.length > 2) ||
                                    (q.questionType === "Match the Pair" &&
                                      q.matchPairs?.length > 2) ||
                                    ([
                                      "One sentence",
                                      "Short answer type",
                                      "Long answer type",
                                      "Fill in the blanks",
                                    ].includes(q.questionType) &&
                                      (q.modelAnswer?.length > 60 ||
                                        q.fillInBlankAnswer?.length > 60))) && (
                                    <button
                                      onClick={() => toggleExpandAnswer(q.id)}
                                      className="text-blue-500 hover:text-blue-700 transition-colors p-0.5 bg-blue-50 hover:bg-blue-100 rounded border border-blue-100"
                                    >
                                      <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${expandedAnswers[q.id] ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* Multiple Choice */}
                                {q.questionType === "Multiple Choice" &&
                                  q.options && (
                                    <div
                                      className={`space-y-1.5 ${expandedAnswers[q.id] ? "max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : ""}`}
                                    >
                                      {(expandedAnswers[q.id]
                                        ? q.options
                                        : q.options.slice(0, 2)
                                      ).map((opt, idx) => (
                                        <div
                                          key={idx}
                                          className={`px-2.5 py-1.5 rounded-md text-xs border flex items-center ${opt.isCorrect ? "bg-green-50 border-green-200 text-green-800 font-medium" : "bg-white border-slate-200 text-slate-500"}`}
                                        >
                                          <span className="mr-1.5 opacity-50 font-semibold">
                                            {String.fromCharCode(65 + idx)}.
                                          </span>
                                          <span className="truncate flex-1">
                                            {opt.text}
                                          </span>
                                          {opt.isCorrect && (
                                            <Check
                                              size={14}
                                              className="text-green-600 shrink-0 ml-2"
                                            />
                                          )}
                                        </div>
                                      ))}
                                      {!expandedAnswers[q.id] &&
                                        q.options.length > 2 && (
                                          <div
                                            onClick={() => toggleExpandAnswer(q.id)}
                                            className="text-[10px] text-slate-400 font-bold text-center cursor-pointer hover:text-blue-500 py-1.5 bg-white border border-slate-100 hover:border-blue-100 rounded-md transition-colors mt-1"
                                          >
                                            + {q.options.length - 2} MORE OPTIONS
                                          </div>
                                        )}
                                    </div>
                                  )}

                                {/* True/False */}
                                {q.questionType === "True/False" && (
                                  <div className="flex items-center text-xs font-medium text-slate-600">
                                    Expected:
                                    <span
                                      className={`ml-2 px-2.5 py-0.5 rounded-md font-bold border ${q.trueFalseAnswer === "true" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}
                                    >
                                      {q.trueFalseAnswer
                                        ? q.trueFalseAnswer.toUpperCase()
                                        : "NOT SET"}
                                    </span>
                                  </div>
                                )}

                                {/* Match the Pair */}
                                {q.questionType === "Match the Pair" &&
                                  q.matchPairs && (
                                    <div
                                      className={`space-y-1.5 ${expandedAnswers[q.id] ? "max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : ""}`}
                                    >
                                      {(expandedAnswers[q.id]
                                        ? q.matchPairs
                                        : q.matchPairs.slice(0, 2)
                                      ).map((pair, i) => (
                                        <div
                                          key={i}
                                          className="text-[11px] flex items-center justify-between gap-1.5"
                                        >
                                          <span className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 truncate flex-1 shadow-sm text-center">
                                            {pair.left || "?"}
                                          </span>
                                          <span className="text-slate-300 font-bold">
                                            -
                                          </span>
                                          <span className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 truncate flex-1 shadow-sm text-center">
                                            {pair.right || "?"}
                                          </span>
                                        </div>
                                      ))}
                                      {!expandedAnswers[q.id] &&
                                        q.matchPairs.length > 2 && (
                                          <div
                                            onClick={() => toggleExpandAnswer(q.id)}
                                            className="text-[10px] text-slate-400 font-bold text-center cursor-pointer hover:text-blue-500 py-1.5 bg-white border border-slate-100 hover:border-blue-100 rounded-md transition-colors mt-1"
                                          >
                                            + {q.matchPairs.length - 2} MORE PAIRS
                                          </div>
                                        )}
                                    </div>
                                  )}

                                {/* Text Based Answers */}
                                {[
                                  "One sentence",
                                  "Short answer type",
                                  "Long answer type",
                                  "Fill in the blanks",
                                ].includes(q.questionType) && (
                                  <div className="relative">
                                    <p
                                      className={`text-xs text-slate-600 font-medium ${expandedAnswers[q.id] ? "max-h-32 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : "line-clamp-2"}`}
                                    >
                                      {q.modelAnswer || q.fillInBlankAnswer || (
                                        <span className="italic text-slate-400 font-normal">
                                          No answer provided.
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Metadata tags */}
                              <div className="flex flex-wrap gap-1.5">
                                <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-blue-100">
                                  {q.questionType}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-200">
                                  <Hash size={10} /> {q.marks} Marks
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${q.difficulty === "Hard" ? "bg-red-50 text-red-600 border-red-100" : q.difficulty === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}
                                >
                                  {q.difficulty}
                                </span>
                                {q.cognitiveRating && q.cognitiveRating.length > 0 && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-md uppercase flex items-center gap-1">
                                    <BrainCircuit size={10} />{" "}
                                    {Array.isArray(q.cognitiveRating)
                                      ? q.cognitiveRating.join(", ")
                                      : q.cognitiveRating}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card footer: Edit only (no approve/reject) */}
                            <div className="border-t border-slate-100 bg-slate-50/30 px-6 py-3 flex items-center justify-end">
                              <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <Edit size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[24px] border border-emerald-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="overflow-y-auto max-h-[600px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                        <tr>
                          <th className="p-5 bg-slate-50">Approved Question</th>
                          <th className="p-5 text-right bg-slate-50">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-5 align-top">
                              <p className="font-medium text-slate-800 mb-3">{q.questionText}</p>
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {q.grade && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.grade}</span>}
                                {q.subject && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-100">{q.subject}</span>}
                                {q.chapter && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.chapter}</span>}
                                {q.topic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.topic}</span>}
                                {q.subTopic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.subTopic}</span>}
                                <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-blue-100">{q.questionType}</span>
                                <span className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-200"><Hash size={12} /> {q.marks}</span>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${q.difficulty === "Hard" ? "bg-red-50 text-red-600 border-red-100" : q.difficulty === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>{q.difficulty}</span>
                                {q.cognitiveRating && q.cognitiveRating.length > 0 && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-md uppercase flex items-center gap-1"><BrainCircuit size={10} /> {Array.isArray(q.cognitiveRating) ? q.cognitiveRating.join(", ") : q.cognitiveRating}</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 italic">by {q.author}</p>
                            </td>
                            <td className="p-5 text-right align-middle">
                              <button
                                onClick={() => setApprovedModalQuestion(q)}
                                className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 ml-auto"
                              >
                                <Eye size={14} /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* APPROVED MODAL */}
              {approvedModalQuestion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                  <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5"><CheckCircle2 size={10} /> Approved</span>
                        <span className="text-[11px] text-slate-400 italic">by {approvedModalQuestion.author}</span>
                      </div>
                      <button onClick={() => setApprovedModalQuestion(null)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} /></button>
                    </div>

                    <div className="overflow-y-auto flex-1 p-6 space-y-5">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Question</p>
                        <p className="text-slate-800 font-semibold text-base leading-snug">{approvedModalQuestion.questionText}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {approvedModalQuestion.grade && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{approvedModalQuestion.grade}</span>}
                          {approvedModalQuestion.subject && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase border border-indigo-100">{approvedModalQuestion.subject}</span>}
                          {approvedModalQuestion.chapter && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{approvedModalQuestion.chapter}</span>}
                          {approvedModalQuestion.topic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{approvedModalQuestion.topic}</span>}
                          <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-blue-100">{approvedModalQuestion.questionType}</span>
                          <span className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-200"><Hash size={10} /> {approvedModalQuestion.marks}</span>
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${approvedModalQuestion.difficulty === "Hard" ? "bg-red-50 text-red-600 border-red-100" : approvedModalQuestion.difficulty === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>{approvedModalQuestion.difficulty}</span>
                          {approvedModalQuestion.cognitiveRating && approvedModalQuestion.cognitiveRating.length > 0 && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-md uppercase flex items-center gap-1"><BrainCircuit size={10} /> {Array.isArray(approvedModalQuestion.cognitiveRating) ? approvedModalQuestion.cognitiveRating.join(", ") : approvedModalQuestion.cognitiveRating}</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Answer</p>
                        {approvedModalQuestion.questionType === "Multiple Choice" && approvedModalQuestion.options && (
                          <div className="space-y-2">
                            {approvedModalQuestion.options.map((opt, idx) => (
                              <div key={idx} className={`px-3 py-2 rounded-xl text-sm border flex items-center gap-2 ${opt.isCorrect ? "bg-green-50 border-green-200 text-green-800 font-medium" : "bg-white border-slate-200 text-slate-500"}`}>
                                <span className="opacity-50 font-semibold text-xs">{String.fromCharCode(65 + idx)}.</span>
                                <span className="flex-1">{opt.text}</span>
                                {opt.isCorrect && <Check size={14} className="text-green-600 shrink-0" />}
                              </div>
                            ))}
                          </div>
                        )}
                        {approvedModalQuestion.questionType === "True/False" && (
                          <div className="flex items-center text-sm font-medium text-slate-600">
                            Expected:
                            <span className={`ml-2 px-3 py-1 rounded-lg font-bold border ${approvedModalQuestion.trueFalseAnswer === "true" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                              {approvedModalQuestion.trueFalseAnswer ? approvedModalQuestion.trueFalseAnswer.toUpperCase() : "NOT SET"}
                            </span>
                          </div>
                        )}
                        {approvedModalQuestion.questionType === "Match the Pair" && approvedModalQuestion.matchPairs && (
                          <div className="space-y-2">
                            {approvedModalQuestion.matchPairs.map((pair, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <span className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-center">{pair.left || "?"}</span>
                                <span className="text-slate-300 font-bold">→</span>
                                <span className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-center">{pair.right || "?"}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {["One sentence", "Short answer type", "Long answer type", "Fill in the blanks"].includes(approvedModalQuestion.questionType) && (
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {approvedModalQuestion.modelAnswer || approvedModalQuestion.fillInBlankAnswer || <span className="italic text-slate-400">No answer provided.</span>}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-100 bg-slate-50 p-4 flex justify-end gap-3">
                      <button onClick={() => setApprovedModalQuestion(null)} className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors">
                        Close
                      </button>
                      <button className="px-6 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 font-bold rounded-xl transition-colors flex items-center gap-2">
                        <Edit size={16} /> Edit Question
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* REVIEW & MODERATION */}
          {activeMenu === "review" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <button
                  onClick={() => setIsReviewFiltersOpen(!isReviewFiltersOpen)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Filter className="text-blue-500" size={20} />
                    <h3 className="text-lg font-bold text-slate-800">
                      Filter Pending Reviews
                    </h3>
                    {activeReviewFiltersCount > 0 && (
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-blue-100">
                        {activeReviewFiltersCount} Active
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${isReviewFiltersOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {isReviewFiltersOpen && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        name="academicYear"
                        value={reviewFilters.academicYear}
                        onChange={handleReviewFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Academic Years</option>
                        <option value="2025-2026">2025-2026</option>
                      </select>
                      <select
                        name="grade"
                        value={reviewFilters.grade}
                        onChange={handleReviewFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Classes</option>
                        {[8, 9, 10, 11, 12].map((n) => (
                          <option key={n} value={`Class ${n}`}>
                            Class {n}
                          </option>
                        ))}
                      </select>
                      <select
                        name="subject"
                        value={reviewFilters.subject}
                        onChange={handleReviewFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Subjects</option>
                        {Object.keys(SUBJECTS).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <select
                        name="chapter"
                        value={reviewFilters.chapter}
                        onChange={handleReviewFilterChange}
                        disabled={!reviewFilters.subject}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 disabled:bg-slate-50 disabled:opacity-70"
                      >
                        <option value="">
                          {reviewFilters.subject
                            ? "All Chapters"
                            : "Select Subject First"}
                        </option>
                        {reviewFilters.subject &&
                          SUBJECTS[reviewFilters.subject].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                      </select>
                      <select
                        name="topic"
                        value={reviewFilters.topic}
                        onChange={handleReviewFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All Topics</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <select
                        name="questionType"
                        value={reviewFilters.questionType}
                        onChange={handleReviewFilterChange}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      >
                        <option value="">All question types</option>
                        {questionTypesConfig.map((t) => (
                          <option key={t.id} value={t.type}>
                            {t.type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="search"
                        value={reviewFilters.search}
                        onChange={handleReviewFilterChange}
                        placeholder="Search pending..."
                        className="w-full pl-10 p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                      />
                    </div>

                    <div className="pt-4 pb-2 flex flex-col lg:flex-row gap-6 lg:gap-8">
                      <div className="flex-1 space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                          Difficulty Level
                        </span>
                        <div className="flex gap-3">
                          {["Easy", "Medium", "Hard"].map((diff) => (
                            <button
                              key={diff}
                              type="button"
                              onClick={() =>
                                setReviewFilters((prev) => ({
                                  ...prev,
                                  difficulty:
                                    prev.difficulty === diff ? "" : diff,
                                }))
                              }
                              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${reviewFilters.difficulty === diff ? "bg-blue-50 border-blue-500 text-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,1)]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                              {diff}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="hidden lg:block w-px bg-slate-100 self-stretch my-2"></div>
                      <div className="flex-[1.5] space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <BrainCircuit size={14} className="text-blue-500" />{" "}
                          Cognitive Rating (Bloom's)
                        </span>
                        <div className="flex gap-3">
                          {["Knowledge", "Understanding", "Application"].map(
                            (cog) => {
                              const isActive =
                                reviewFilters.cognitiveRating?.includes(cog);
                              return (
                                <button
                                  key={cog}
                                  type="button"
                                  onClick={() => {
                                    setReviewFilters((prev) => {
                                      const current =
                                        prev.cognitiveRating || [];
                                      const updated = current.includes(cog)
                                        ? current.filter((c) => c !== cog)
                                        : [...current, cog];
                                      return {
                                        ...prev,
                                        cognitiveRating: updated,
                                      };
                                    });
                                  }}
                                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${isActive ? "bg-blue-50 border-blue-500 text-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,1)]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                                >
                                  {cog}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-700">
                  Showing {filteredPendingQuestions.length} questions to review
                </h4>
                <div className="bg-slate-200/60 p-1 rounded-xl flex gap-1">
                  <button
                    onClick={() => setReviewViewMode("grid")}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${reviewViewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                  >
                    <LayoutGrid size={16} />
                    Grid
                  </button>
                  <button
                    onClick={() => setReviewViewMode("table")}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${reviewViewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                  >
                    <List size={16} />
                    Table
                  </button>
                </div>
              </div>

              {reviewViewMode === "grid" ? (
                <div className="space-y-10">
                  {Object.entries(
                    filteredPendingQuestions.reduce((acc, q) => {
                      const groupKey = `${q.grade || "No Class"} • ${q.subject || "No Subject"}`;
                      if (!acc[groupKey]) acc[groupKey] = [];
                      acc[groupKey].push(q);
                      return acc;
                    }, {}),
                  ).map(([groupKey, groupQuestions]) => (
                    <div key={groupKey} className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-3 flex items-center gap-3">
                        {groupKey}
                        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {groupQuestions.length}
                        </span>
                      </h4>

                      <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x px-1 -mx-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100/50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 transition-colors">
                        {groupQuestions.map((q) => (
                          <div
                            key={q.id}
                            className="bg-white rounded-[24px] shadow-sm border border-amber-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative min-w-[340px] w-[340px] shrink-0 snap-start"
                          >
                            <div className="p-6 flex flex-col flex-1">
                              <div className="flex justify-between items-start mb-4">
                                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded uppercase tracking-widest border border-amber-100 flex items-center gap-1.5">
                                  <AlertCircle size={10} /> Reviewing
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium italic truncate max-w-[100px]">
                                  by {q.author}
                                </span>
                              </div>
                              <h4 className="text-slate-800 font-semibold text-base mb-4 flex-1 line-clamp-3">
                                {q.questionText}
                              </h4>

                              {/* --- PROPOSED ANSWER UI --- */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 relative transition-all">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Proposed Answer
                                  </span>
                                  {((q.questionType === "Multiple Choice" &&
                                    q.options?.length > 2) ||
                                    (q.questionType === "Match the Pair" &&
                                      q.matchPairs?.length > 2) ||
                                    ([
                                      "One sentence",
                                      "Short answer type",
                                      "Long answer type",
                                      "Fill in the blanks",
                                    ].includes(q.questionType) &&
                                      (q.modelAnswer?.length > 60 ||
                                        q.fillInBlankAnswer?.length > 60))) && (
                                    <button
                                      onClick={() => toggleExpandAnswer(q.id)}
                                      className="text-blue-500 hover:text-blue-700 transition-colors p-0.5 bg-blue-50 hover:bg-blue-100 rounded border border-blue-100"
                                    >
                                      <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${expandedAnswers[q.id] ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* Multiple Choice */}
                                {q.questionType === "Multiple Choice" &&
                                  q.options && (
                                    <div
                                      className={`space-y-1.5 ${expandedAnswers[q.id] ? "max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : ""}`}
                                    >
                                      {(expandedAnswers[q.id]
                                        ? q.options
                                        : q.options.slice(0, 2)
                                      ).map((opt, idx) => (
                                        <div
                                          key={idx}
                                          className={`px-2.5 py-1.5 rounded-md text-xs border flex items-center ${opt.isCorrect ? "bg-green-50 border-green-200 text-green-800 font-medium" : "bg-white border-slate-200 text-slate-500"}`}
                                        >
                                          <span className="mr-1.5 opacity-50 font-semibold">
                                            {String.fromCharCode(65 + idx)}.
                                          </span>
                                          <span className="truncate flex-1">
                                            {opt.text}
                                          </span>
                                          {opt.isCorrect && (
                                            <Check
                                              size={14}
                                              className="text-green-600 shrink-0 ml-2"
                                            />
                                          )}
                                        </div>
                                      ))}
                                      {!expandedAnswers[q.id] &&
                                        q.options.length > 2 && (
                                          <div
                                            onClick={() =>
                                              toggleExpandAnswer(q.id)
                                            }
                                            className="text-[10px] text-slate-400 font-bold text-center cursor-pointer hover:text-blue-500 py-1.5 bg-white border border-slate-100 hover:border-blue-100 rounded-md transition-colors mt-1"
                                          >
                                            + {q.options.length - 2} MORE
                                            OPTIONS
                                          </div>
                                        )}
                                    </div>
                                  )}

                                {/* True/False */}
                                {q.questionType === "True/False" && (
                                  <div className="flex items-center text-xs font-medium text-slate-600">
                                    Expected:
                                    <span
                                      className={`ml-2 px-2.5 py-0.5 rounded-md font-bold border ${q.trueFalseAnswer === "true" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}
                                    >
                                      {q.trueFalseAnswer
                                        ? q.trueFalseAnswer.toUpperCase()
                                        : "NOT SET"}
                                    </span>
                                  </div>
                                )}

                                {/* Match the Pair */}
                                {q.questionType === "Match the Pair" &&
                                  q.matchPairs && (
                                    <div
                                      className={`space-y-1.5 ${expandedAnswers[q.id] ? "max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : ""}`}
                                    >
                                      {(expandedAnswers[q.id]
                                        ? q.matchPairs
                                        : q.matchPairs.slice(0, 2)
                                      ).map((pair, i) => (
                                        <div
                                          key={i}
                                          className="text-[11px] flex items-center justify-between gap-1.5"
                                        >
                                          <span className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 truncate flex-1 shadow-sm text-center">
                                            {pair.left || "?"}
                                          </span>
                                          <span className="text-slate-300 font-bold">
                                            -
                                          </span>
                                          <span className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 truncate flex-1 shadow-sm text-center">
                                            {pair.right || "?"}
                                          </span>
                                        </div>
                                      ))}
                                      {!expandedAnswers[q.id] &&
                                        q.matchPairs.length > 2 && (
                                          <div
                                            onClick={() =>
                                              toggleExpandAnswer(q.id)
                                            }
                                            className="text-[10px] text-slate-400 font-bold text-center cursor-pointer hover:text-blue-500 py-1.5 bg-white border border-slate-100 hover:border-blue-100 rounded-md transition-colors mt-1"
                                          >
                                            + {q.matchPairs.length - 2} MORE
                                            PAIRS
                                          </div>
                                        )}
                                    </div>
                                  )}

                                {/* Text Based Answers */}
                                {[
                                  "One sentence",
                                  "Short answer type",
                                  "Long answer type",
                                  "Fill in the blanks",
                                ].includes(q.questionType) && (
                                  <div className="relative">
                                    <p
                                      className={`text-xs text-slate-600 font-medium ${expandedAnswers[q.id] ? "max-h-32 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full" : "line-clamp-2"}`}
                                    >
                                      {q.modelAnswer || q.fillInBlankAnswer || (
                                        <span className="italic text-slate-400 font-normal">
                                          No answer provided.
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                                  Quality Grade
                                </span>
                                <div
                                  className="flex gap-1"
                                  onMouseLeave={() =>
                                    handleRatingHover(q.id, 0)
                                  }
                                >
                                  {[1, 2, 3, 4, 5].map((star) => {
                                    const active =
                                      (reviewRatings[q.id]?.hover ||
                                        reviewRatings[q.id]?.rating ||
                                        0) >= star;
                                    return (
                                      <button
                                        key={star}
                                        onClick={() =>
                                          handleRatingChange(q.id, star)
                                        }
                                        onMouseEnter={() =>
                                          handleRatingHover(q.id, star)
                                        }
                                        className={`transition-colors ${active ? "text-amber-400" : "text-slate-200"}`}
                                      >
                                        <Star
                                          size={20}
                                          fill={
                                            active ? "currentColor" : "none"
                                          }
                                        />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-t border-slate-100 divide-x divide-slate-100 bg-slate-50/30">
                              <button
                                onClick={() => handleOpenRejectModal(q.id)}
                                className="py-3.5 text-red-500 hover:bg-red-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                              >
                                <XCircle size={14} /> Reject
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(q.id, "Published")
                                }
                                className="py-3.5 text-emerald-600 hover:bg-emerald-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Check size={14} /> Approve
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[24px] border border-amber-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="overflow-y-auto max-h-[600px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                        <tr>
                          <th className="p-5 bg-slate-50">Pending Question</th>
                          <th className="p-5 text-right bg-slate-50">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredPendingQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-5 align-top">
                              <p className="font-medium text-slate-800 mb-3">{q.questionText}</p>
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {q.grade && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.grade}</span>}
                                {q.subject && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-100">{q.subject}</span>}
                                {q.chapter && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.chapter}</span>}
                                {q.topic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.topic}</span>}
                                {q.subTopic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{q.subTopic}</span>}
                                <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-blue-100">{q.questionType}</span>
                                <span className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-200"><Hash size={12} /> {q.marks}</span>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${q.difficulty === "Hard" ? "bg-red-50 text-red-600 border-red-100" : q.difficulty === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>{q.difficulty}</span>
                                {q.cognitiveRating && q.cognitiveRating.length > 0 && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-md uppercase flex items-center gap-1"><BrainCircuit size={10} /> {Array.isArray(q.cognitiveRating) ? q.cognitiveRating.join(", ") : q.cognitiveRating}</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 italic">by {q.author}</p>
                            </td>
                            <td className="p-5 text-right align-middle">
                              <button
                                onClick={() => setReviewModalQuestion(q)}
                                className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 ml-auto"
                              >
                                <MessageSquare size={14} /> Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* REVIEW MODAL */}
              {reviewModalQuestion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                  <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded uppercase tracking-widest border border-amber-100 flex items-center gap-1.5"><AlertCircle size={10} /> Reviewing</span>
                        <span className="text-[11px] text-slate-400 italic">by {reviewModalQuestion.author}</span>
                      </div>
                      <button onClick={() => setReviewModalQuestion(null)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} /></button>
                    </div>

                    <div className="overflow-y-auto flex-1 p-6 space-y-5">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Question</p>
                        <p className="text-slate-800 font-semibold text-base leading-snug">{reviewModalQuestion.questionText}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {reviewModalQuestion.grade && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{reviewModalQuestion.grade}</span>}
                          {reviewModalQuestion.subject && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase border border-indigo-100">{reviewModalQuestion.subject}</span>}
                          {reviewModalQuestion.chapter && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{reviewModalQuestion.chapter}</span>}
                          {reviewModalQuestion.topic && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{reviewModalQuestion.topic}</span>}
                          <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-blue-100">{reviewModalQuestion.questionType}</span>
                          <span className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-200"><Hash size={10} /> {reviewModalQuestion.marks}</span>
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${reviewModalQuestion.difficulty === "Hard" ? "bg-red-50 text-red-600 border-red-100" : reviewModalQuestion.difficulty === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>{reviewModalQuestion.difficulty}</span>
                          {reviewModalQuestion.cognitiveRating && reviewModalQuestion.cognitiveRating.length > 0 && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-md uppercase flex items-center gap-1"><BrainCircuit size={10} /> {Array.isArray(reviewModalQuestion.cognitiveRating) ? reviewModalQuestion.cognitiveRating.join(", ") : reviewModalQuestion.cognitiveRating}</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Proposed Answer</p>
                        {reviewModalQuestion.questionType === "Multiple Choice" && reviewModalQuestion.options && (
                          <div className="space-y-2">
                            {reviewModalQuestion.options.map((opt, idx) => (
                              <div key={idx} className={`px-3 py-2 rounded-xl text-sm border flex items-center gap-2 ${opt.isCorrect ? "bg-green-50 border-green-200 text-green-800 font-medium" : "bg-white border-slate-200 text-slate-500"}`}>
                                <span className="opacity-50 font-semibold text-xs">{String.fromCharCode(65 + idx)}.</span>
                                <span className="flex-1">{opt.text}</span>
                                {opt.isCorrect && <Check size={14} className="text-green-600 shrink-0" />}
                              </div>
                            ))}
                          </div>
                        )}
                        {reviewModalQuestion.questionType === "True/False" && (
                          <div className="flex items-center text-sm font-medium text-slate-600">
                            Expected:
                            <span className={`ml-2 px-3 py-1 rounded-lg font-bold border ${reviewModalQuestion.trueFalseAnswer === "true" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                              {reviewModalQuestion.trueFalseAnswer ? reviewModalQuestion.trueFalseAnswer.toUpperCase() : "NOT SET"}
                            </span>
                          </div>
                        )}
                        {reviewModalQuestion.questionType === "Match the Pair" && reviewModalQuestion.matchPairs && (
                          <div className="space-y-2">
                            {reviewModalQuestion.matchPairs.map((pair, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <span className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-center">{pair.left || "?"}</span>
                                <span className="text-slate-300 font-bold">→</span>
                                <span className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-center">{pair.right || "?"}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {["One sentence", "Short answer type", "Long answer type", "Fill in the blanks"].includes(reviewModalQuestion.questionType) && (
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {reviewModalQuestion.modelAnswer || reviewModalQuestion.fillInBlankAnswer || <span className="italic text-slate-400">No answer provided.</span>}
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quality Grade</p>
                        <div className="flex gap-2" onMouseLeave={() => handleRatingHover(reviewModalQuestion.id, 0)}>
                          {[1, 2, 3, 4, 5].map((star) => {
                            const active = (reviewRatings[reviewModalQuestion.id]?.hover || reviewRatings[reviewModalQuestion.id]?.rating || 0) >= star;
                            return (
                              <button key={star} onClick={() => handleRatingChange(reviewModalQuestion.id, star)} onMouseEnter={() => handleRatingHover(reviewModalQuestion.id, star)} className={`transition-all hover:scale-110 ${active ? "text-amber-400" : "text-slate-200"}`}>
                                <Star size={28} fill={active ? "currentColor" : "none"} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-t border-slate-100 divide-x divide-slate-100">
                      <button onClick={() => { handleOpenRejectModal(reviewModalQuestion.id); setReviewModalQuestion(null); }} className="py-4 text-red-500 hover:bg-red-50 font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <XCircle size={16} /> Reject
                      </button>
                      <button onClick={() => { handleUpdateStatus(reviewModalQuestion.id, "Published"); setReviewModalQuestion(null); }} className="py-4 text-emerald-600 hover:bg-emerald-50 font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <Check size={16} /> Approve
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* QUESTION TYPES */}
          {activeMenu === "questionTypes" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              {showConfigSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold text-sm">
                      Configurations saved successfully!
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-[20px] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Settings size={20} className="text-blue-500" /> System
                    Format Configuration
                  </h3>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 py-3">Question Type</th>
                      <th className="p-4 py-3">Default Marks</th>
                      <th className="p-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {questionTypesConfig.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-700">
                          {t.type}
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={t.marks}
                            onChange={(e) =>
                              handleConfigMarksChange(t.id, e.target.value)
                            }
                            className="w-20 p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
                            min="1"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveConfig}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                >
                  <Save size={16} /> Save Configurations
                </button>
              </div>
            </div>
          )}

          {/* BLUEPRINT */}
          {activeMenu === "blueprint" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
              {/* Configuration Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <LayoutGrid className="text-blue-500" size={24} />
                    Blueprint Configuration
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-600">Total Allocated Marks:</span>
                    <span className={`text-xl font-black ${calculateTotalAllocatedMarks() === blueprintConfig.maxMarks ? 'text-green-600' : calculateTotalAllocatedMarks() > blueprintConfig.maxMarks ? 'text-red-500' : 'text-blue-600'}`}>
                      {calculateTotalAllocatedMarks()} <span className="text-sm text-slate-400 font-bold">/ {blueprintConfig.maxMarks}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={blueprintConfig.grade}
                    onChange={(e) => setBlueprintConfig({ ...blueprintConfig, grade: e.target.value })}
                    className="p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                  >
                    <option value="">Select Class</option>
                    {[8, 9, 10, 11, 12].map((n) => (
                      <option key={n} value={`Class ${n}`}>Class {n}</option>
                    ))}
                  </select>
                  <select
                    value={blueprintConfig.subject}
                    onChange={(e) => setBlueprintConfig({ ...blueprintConfig, subject: e.target.value })}
                    className="p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                  >
                    <option value="">Select Subject</option>
                    {Object.keys(SUBJECTS).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <select
                    value={blueprintConfig.examType}
                    onChange={(e) => setBlueprintConfig({ ...blueprintConfig, examType: e.target.value })}
                    className="p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                  >
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Annual">Annual</option>
                  </select>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase tracking-wider">Max</span>
                    <input
                      type="number"
                      value={blueprintConfig.maxMarks}
                      onChange={(e) => setBlueprintConfig({ ...blueprintConfig, maxMarks: parseInt(e.target.value) || 0 })}
                      className="w-full pl-12 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Difficulty:</span>
                  {["Easy", "Medium", "Hard"].map((level) => {
                    const isActive = blueprintConfig.difficulty.includes(level);
                    const colorMap = {
                      Easy: isActive ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-emerald-600 border-emerald-200 hover:border-emerald-400",
                      Medium: isActive ? "bg-amber-500 text-white border-amber-500" : "bg-white text-amber-600 border-amber-200 hover:border-amber-400",
                      Hard: isActive ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-red-200 hover:border-red-400",
                    };
                    return (
                      <button
                        key={level}
                        onClick={() => {
                          const current = blueprintConfig.difficulty;
                          const updated = current.includes(level)
                            ? current.filter(d => d !== level)
                            : [...current, level];
                          setBlueprintConfig({ ...blueprintConfig, difficulty: updated });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${colorMap[level]}`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Blueprint Builder */}
              {blueprintConfig.subject && blueprintConfig.grade ? (
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                        <tr>
                          <th className="p-4 w-64 bg-slate-50">Topic</th>
                          <th className="p-4 text-center bg-slate-50 border-r border-slate-200 bg-amber-50/30 text-amber-700">Target Marks</th>
                          {questionTypesConfig.map(qt => (
                            <th key={qt.id} className="p-4 text-center bg-slate-50 min-w-[120px]">
                              {qt.type} <span className="block text-[10px] text-slate-400 normal-case font-medium mt-0.5">({qt.marks}m)</span>
                            </th>
                          ))}
                          <th className="p-4 text-center bg-slate-50 border-l border-slate-200 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] sticky right-0">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {baselineData.chapters.filter(c => c.subject === blueprintConfig.subject && c.grade === blueprintConfig.grade).map(chapter => {
                          const chapterTopics = baselineData.topics.filter(t => t.chapter === chapter.name && t.subject === blueprintConfig.subject && t.grade === blueprintConfig.grade);
                          const isExpanded = expandedBlueprintChapters[chapter.id] === true;
                          
                          let chapterManualTargetsSum = 0;
                          let chapterAllocatedMarks = 0;
                          chapterTopics.forEach(t => {
                            const tData = blueprintData[t.id];
                            chapterManualTargetsSum += tData?.manualMax || 0;
                            chapterAllocatedMarks += calculateTopicMarks(t.id);
                          });
                          
                          const chapterLimit = blueprintChapterData[chapter.id]?.targetMarks || 0;

                          return (
                            <React.Fragment key={chapter.id}>
                              {/* Chapter Header Row */}
                              <tr className="bg-slate-50/80 hover:bg-slate-100/50 cursor-pointer transition-colors" onClick={(e) => {
                                if (e.target.tagName !== 'INPUT') toggleBlueprintChapter(chapter.id);
                              }}>
                                <td colSpan={questionTypesConfig.length + 3} className="p-0">
                                  <div className="flex items-center justify-between p-4 px-5">
                                    <div className="flex items-center gap-3">
                                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${!isExpanded ? "-rotate-90" : ""}`} />
                                      <span className="font-bold text-slate-800">{chapter.name}</span>
                                      <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{chapterTopics.length} Topics</span>
                                    </div>

                                    <div className="flex items-center gap-6 pr-4">
                                        <div className="flex items-center gap-2">
                                          <div className="relative">
                                            <input
                                              type="number"
                                              value={blueprintConfig.maxMarks > 0 && blueprintChapterData[chapter.id]?.targetMarks > 0
                                                ? Math.round((blueprintChapterData[chapter.id].targetMarks / blueprintConfig.maxMarks) * 100)
                                                : ""}
                                              onChange={(e) => handleBlueprintChapterPercentChange(chapter.id, e.target.value, blueprintConfig.maxMarks)}
                                              placeholder="0"
                                              className="w-20 pl-2 pr-6 py-1.5 bg-white border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-center font-bold text-indigo-700"
                                              min="0"
                                              max="100"
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 font-bold text-xs">%</span>
                                          </div>
                                          <span className="text-slate-300 font-bold">=</span>
                                          <div className="relative">
                                            <input
                                              type="number"
                                              value={blueprintChapterData[chapter.id]?.targetMarks || ""}
                                              onChange={(e) => handleBlueprintChapterMarksChange(chapter.id, e.target.value)}
                                              placeholder="0"
                                              className="w-20 pl-2 pr-6 py-1.5 bg-white border border-amber-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-sm text-center font-bold text-amber-700"
                                              min="0"
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-xs">m</span>
                                          </div>
                                        </div>
                                        <div className="text-right ml-4">
                                          <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Topic Targets Sum:</span>
                                          <span className={`font-bold ${chapterManualTargetsSum > 0 ? (chapterManualTargetsSum === chapterLimit ? "text-green-600" : "text-red-500") : "text-slate-700"}`}>{chapterManualTargetsSum}</span>
                                        </div>
                                        <div className="text-right ml-4">
                                          <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Allocated:</span>
                                          <span className={`font-bold ${chapterLimit > 0 ? (chapterAllocatedMarks === chapterLimit ? "text-green-600" : "text-blue-600") : "text-slate-700"}`}>{chapterAllocatedMarks}</span>
                                        </div>
                                      </div>
                                  </div>
                                </td>
                              </tr>

                              {/* Topic Rows */}
                              {isExpanded && chapterTopics.map(topic => {
                                const topicData = blueprintData[topic.id] || {};
                                const topicTotal = calculateTopicMarks(topic.id);
                                const manualMax = topicData.manualMax || 0;
                                const chapterMax = blueprintChapterData[chapter.id]?.targetMarks || 0;
                                const isManualMaxSet = manualMax > 0;
                                const isChapterMaxSet = chapterMax > 0;
                                const isTopicMaxMet = isManualMaxSet && topicTotal >= manualMax;
                                const isTopicMaxExceeded = isManualMaxSet && topicTotal > manualMax;

                                return (
                                  <tr key={topic.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-12">
                                      <p className="font-medium text-slate-700">{topic.name}</p>
                                    </td>
                                    
                                    <td className="p-3 text-center border-r border-slate-100 bg-amber-50/10">
                                        <input
                                          type="number"
                                          value={topicData.manualMax || ""}
                                          onChange={(e) => handleBlueprintTargetMarksChange(topic.id, e.target.value)}
                                          placeholder="—"
                                          className={`w-16 p-2 bg-white border rounded-lg outline-none focus:ring-2 text-sm text-center font-bold transition-colors ${
                                            isManualMaxSet
                                              ? isTopicMaxExceeded
                                                ? "border-red-300 text-red-600 focus:ring-red-400"
                                                : isTopicMaxMet
                                                  ? "border-green-300 text-green-700 focus:ring-green-400"
                                                  : "border-amber-300 text-amber-700 focus:ring-amber-500"
                                              : "border-slate-200 text-slate-500 focus:ring-blue-500"
                                          }`}
                                          min="0"
                                        />
                                    </td>

                                    {questionTypesConfig.map(qt => {
                                      const count = topicData.questions?.[qt.id] || 0;
                                      // Constraint: topic manualMax takes priority, then chapter target
                                      const wouldExceedTopic = isManualMaxSet && (topicTotal + qt.marks) > manualMax;
                                      const chapterAllocatedSoFar = chapterTopics.reduce((sum, t) => sum + calculateTopicMarks(t.id), 0);
                                      const wouldExceedChapter = !isManualMaxSet && isChapterMaxSet && (chapterAllocatedSoFar + qt.marks) > chapterMax;
                                      const isPlusBlocked = wouldExceedTopic || wouldExceedChapter;
                                      return (
                                        <td key={qt.id} className="p-3">
                                          <div className="flex items-center justify-center">
                                            <div className={`flex items-center bg-white border rounded-lg overflow-hidden shadow-sm ${isPlusBlocked && count === (topicData.questions?.[qt.id] || 0) ? "" : ""}`}>
                                              <button
                                                onClick={() => handleBlueprintQuestionChange(topic.id, qt.id, -1)}
                                                className={`w-8 h-8 flex items-center justify-center transition-colors ${count > 0 ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 bg-slate-50 cursor-not-allowed"}`}
                                                disabled={count === 0}
                                              >
                                                -
                                              </button>
                                              <div className={`w-8 h-8 flex items-center justify-center text-sm font-bold border-x border-slate-200 ${count > 0 ? "bg-blue-50 text-blue-700" : "bg-white text-slate-400"}`}>
                                                {count}
                                              </div>
                                              <button
                                                onClick={() => !isPlusBlocked && handleBlueprintQuestionChange(topic.id, qt.id, 1)}
                                                disabled={isPlusBlocked}
                                                title={isPlusBlocked ? (wouldExceedTopic ? `Topic max (${manualMax}m) reached` : `Chapter max (${chapterMax}m) reached`) : ""}
                                                className={`w-8 h-8 flex items-center justify-center transition-colors ${
                                                  isPlusBlocked
                                                    ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                                                    : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>
                                        </td>
                                      );
                                    })}

                                    <td className="p-4 text-center border-l border-slate-100 bg-slate-50/50 sticky right-0">
                                      {isManualMaxSet ? (
                                        <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-bold border ${
                                          isTopicMaxMet
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : isTopicMaxExceeded
                                              ? "bg-red-50 text-red-700 border-red-200"
                                              : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}>
                                          {topicTotal} / {manualMax}
                                          {isTopicMaxMet && <CheckCircle2 size={14} className="ml-1.5 text-green-600" />}
                                        </div>
                                      ) : (
                                        <span className={`text-lg font-black ${topicTotal > 0 ? "text-blue-600" : "text-slate-300"}`}>
                                          {topicTotal}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                  <Database className="mx-auto text-slate-300 mb-4" size={48} />
                  <h4 className="text-lg font-bold text-slate-700 mb-2">Select Class & Subject</h4>
                  <p className="text-slate-500 max-w-md mx-auto">Please configure the class and subject in the header above to load the corresponding chapters and topics for blueprinting.</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Sticky Footer for Add Question */}
        {activeMenu === "questionBank" && questionTab === "create" && (
          <footer className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <p className="text-sm text-slate-500 hidden sm:block">
                Please ensure all mandatory fields (*) are filled.
              </p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={(e) => handleSaveQuestion(e, true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Draft
                </button>
                <button
                  onClick={(e) => handleSaveQuestion(e, false)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus size={18} />{" "}
                  {editingId
                    ? "Update & Send for Review"
                    : "Save & Send for Review"}
                </button>
              </div>
            </div>
          </footer>
        )}

        {/* Sticky Footer for Blueprint */}
        {activeMenu === "blueprint" && blueprintConfig.subject && blueprintConfig.grade && (
          <footer className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Questions</span>
                  <span className="text-lg font-black text-slate-800">{calculateTotalAllocatedQuestions()}</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Marks</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-lg font-black ${calculateTotalAllocatedMarks() === blueprintConfig.maxMarks ? 'text-green-600' : calculateTotalAllocatedMarks() > blueprintConfig.maxMarks ? 'text-red-500' : 'text-blue-600'}`}>
                      {calculateTotalAllocatedMarks()}
                    </span>
                    <span className="text-sm font-bold text-slate-400">/ {blueprintConfig.maxMarks} Target</span>
                  </div>
                </div>
              </div>
              <button
                className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 ${calculateTotalAllocatedMarks() === blueprintConfig.maxMarks ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                disabled={calculateTotalAllocatedMarks() !== blueprintConfig.maxMarks}
              >
                <Save size={18} /> Save Blueprint
              </button>
            </div>
          </footer>
        )}
      </div>

      {/* REJECTION REMARK MODAL */}
      {rejectModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <XCircle size={20} className="text-red-500" /> Rejection Remark
              </h3>
              <button
                onClick={handleCloseRejectModal}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Please provide constructive feedback for the contributor.
              </p>
              <textarea
                autoFocus
                value={rejectModal.remark}
                onChange={(e) =>
                  setRejectModal((prev) => ({
                    ...prev,
                    remark: e.target.value,
                  }))
                }
                className="w-full min-h-[140px] p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all text-sm text-slate-800 resize-none"
                placeholder="The options are missing or incorrect..."
              />
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
              <button
                onClick={handleCloseRejectModal}
                className="flex-1 py-3 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-white rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRejection}
                disabled={!rejectModal.remark.trim()}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-200 disabled:shadow-none"
              >
                Reject & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Transitions */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-fade-in { animation: fadein 0.4s ease-out; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-down { animation: fadeindown 0.3s ease-out; }
        @keyframes fadeindown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `,
        }}
      />
    </div>
  );
}
