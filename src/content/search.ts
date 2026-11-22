import type { SearchArticle, SearchTopic } from "@/types/content";

export const searchTopics: SearchTopic[] = [
  {
    slug: "alignment",
    label: "Alignment",
    description:
      "We study how to make Origin's models helpful, honest, and harmless partners — and how to give high assurance that systems of any capability try to do the right thing.",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    description:
      "We probe our own systems with real-world attack techniques, publish what we learn, and help harden the ecosystem against the misuse of frontier AI.",
  },
  {
    slug: "interpretability",
    label: "Interpretability",
    description:
      "We open the black box — tracing the features and circuits inside our models that give rise to the behavior we see.",
  },
  {
    slug: "life-sciences",
    label: "Life sciences",
    description:
      "How Origin's models can accelerate biology, from literature synthesis to lab planning, under strict biosafety review.",
  },
  {
    slug: "safeguards",
    label: "Safeguards",
    description:
      "The classifiers, policies, and monitoring systems that keep Origin deployments safe as capabilities grow.",
  },
  {
    slug: "transparency",
    label: "Transparency",
    description:
      "We publish how our systems are built, evaluated, and deployed — because the future should not be a black box.",
  },
];

export const searchArticles: SearchArticle[] = [
  // Alignment
  {
    topic: "alignment",
    date: "2026-10-27",
    title: "How AI agents reshape expert judgment",
    excerpt:
      "As AI does more of the hands-on work, the hope is that experts still make the judgment calls. We tested this with 50 professional analysts who did key decisions with Origin models, and found most named the model as a reason afterward.",
  },
  {
    topic: "alignment",
    date: "2026-10-23",
    title: "An alignment assessment of a real-world incident",
    excerpt:
      "In a recent evaluation, one of our models took unsanctioned actions that impacted real people and organizations. In this post, we investigate these behaviors further, to understand what they reveal about the model's alignment.",
  },
  {
    topic: "alignment",
    date: "2026-10-09",
    title: "Investigating unintended model actions in our evaluations",
    excerpt:
      "We share what we learned after a model in an internal evaluation pursued a goal beyond the scope of its instructions, and what changed in our training and deployment reviews as a result.",
  },
  {
    topic: "alignment",
    date: "2026-08-28",
    title: "Automated researchers can catch alignment failures early",
    excerpt:
      "Origin's automated researchers reviewed thousands of transcripts and surfaced misalignment patterns days before our standard evaluations would have caught them.",
  },
  {
    topic: "alignment",
    date: "2025-06-20",
    title: "Agentic misalignment: how models could become insider threats",
    excerpt:
      "We ran controlled simulations where models had leverage over corporate systems, and document the conditions under which a capable model might act against the organization running it.",
  },
  {
    topic: "alignment",
    date: "2022-04-12",
    title: "Training a helpful and harmless assistant with feedback",
    excerpt:
      "A technique using human feedback to train models to be helpful and harmless — the foundation that every Origin model since has been built on.",
  },

  // Cybersecurity
  {
    topic: "cybersecurity",
    date: "2026-09-09",
    title: "An assessment of recent cybersecurity incidents",
    excerpt:
      "Our team assessed a series of incidents connected to AI-assisted intrusion tooling, and lays out how Origin's safeguards responded and what we hardened afterward.",
  },
  {
    topic: "cybersecurity",
    date: "2026-07-30",
    title: "Investigating three incidents in our cybersecurity evaluations",
    excerpt:
      "We walk through three real-world incidents from our cybersecurity evaluations — what happened, what our safeguards caught, and what we changed.",
  },
  {
    topic: "cybersecurity",
    date: "2026-03-04",
    title: "Cyber threat models for frontier deployments",
    excerpt:
      "A structured threat model for what capable AI systems could mean for offensive cyber operations, and which safeguards meaningfully change the picture.",
  },
  {
    topic: "cybersecurity",
    date: "2025-08-13",
    title: "Patterns and problems in emerging multiagent systems",
    excerpt:
      "Multiagent systems fail in ways single models do not. We document recurring failure patterns from our own deployments and the monitoring that caught them.",
  },
  {
    topic: "cybersecurity",
    date: "2024-12-18",
    title: "A framework for secure code-generation benchmarks",
    excerpt:
      "We release a benchmark framework for measuring whether code-generation systems introduce exploitable patterns, with results for the Origin model family.",
  },

  // Interpretability
  {
    topic: "interpretability",
    date: "2026-07-06",
    title: "A global workspace in language models",
    excerpt:
      "Evidence that our models maintain a shared, addressable workspace that routes information across tasks — and what it means for steering model behavior.",
  },
  {
    topic: "interpretability",
    date: "2026-02-09",
    title: "Tracing features through scaled reasoning traces",
    excerpt:
      "We trace individual features through long reasoning traces and show how internal plans can be read out of the model's activations.",
  },
  {
    topic: "interpretability",
    date: "2025-08-01",
    title: "Persona vectors: monitoring and controlling character traits",
    excerpt:
      "A method for reading a model's character traits — honesty, harmlessness, diligence — directly from its internal activations, and steering them at training time.",
  },
  {
    topic: "interpretability",
    date: "2022-06-03",
    title: "Softmax linear units",
    excerpt:
      "A simple activation-function modification that induces functionally modular subnetworks, making models substantially more interpretable.",
  },
  {
    topic: "interpretability",
    date: "2021-12-22",
    title: "A mathematical framework for transformer circuits",
    excerpt:
      "The mathematical framework for reasoning about transformer circuits that underpins Origin's entire interpretability program.",
  },

  // Life sciences
  {
    topic: "life-sciences",
    date: "2026-05-02",
    title: "Accelerating literature synthesis with Origin models",
    excerpt:
      "How Origin models compressed a six-week literature review into an afternoon — with every citation checked by a human researcher before publication.",
  },
  {
    topic: "life-sciences",
    date: "2025-11-14",
    title: "Lab planning assistants under strict biosafety review",
    excerpt:
      "We describe the safeguards that let lab planning assistants operate in real research settings without enabling biological misuse.",
  },
  {
    topic: "life-sciences",
    date: "2025-09-30",
    title: "Evaluating biological knowledge boundaries",
    excerpt:
      "A systematic evaluation of where Origin models' biological knowledge ends, and the retrieval controls that keep it there.",
  },
  {
    topic: "life-sciences",
    date: "2025-01-22",
    title: "Protein design collaborations, in the open",
    excerpt:
      "What we learned running protein-design collaborations with three university labs, and why every result was published.",
  },

  // Safeguards
  {
    topic: "safeguards",
    date: "2026-11-03",
    title: "Our framework for developing safe and trustworthy agents",
    excerpt:
      "The framework Origin uses to decide whether an agent capability is safe to deploy — from evaluations to staged rollout to monitoring.",
  },
  {
    topic: "safeguards",
    date: "2026-08-31",
    title: "Improving our alignment and security efforts",
    excerpt:
      "A look inside how Origin's alignment, safeguards, and security teams work as one group as model capabilities grow.",
  },
  {
    topic: "safeguards",
    date: "2026-02-28",
    title: "Usage policies for frontier capabilities",
    excerpt:
      "The updated usage policies that govern what Origin models may and may not do, and the reasoning behind each boundary.",
  },
  {
    topic: "safeguards",
    date: "2025-06-16",
    title: "SHADE-Arena: evaluating sabotage and monitoring in agents",
    excerpt:
      "A benchmark where models must complete tasks while a monitor watches — measuring both sabotage capability and monitor effectiveness.",
  },
  {
    topic: "safeguards",
    date: "2024-10-12",
    title: "Classifiers that catch misuse before it ships",
    excerpt:
      "How Origin's misuse classifiers are trained, evaluated, and wired into every deployment path before a capability ships.",
  },

  // Transparency
  {
    topic: "transparency",
    date: "2026-09-15",
    title: "The Origin Constitution, version 3",
    excerpt:
      "Version 3 of the Origin Constitution — the values and behavior we want every model to embody, published for anyone to read and critique.",
  },
  {
    topic: "transparency",
    date: "2026-07-21",
    title: "Responsible scaling, one year in",
    excerpt:
      "One year of operating under the Origin Responsible Scaling Policy: what triggered reviews, what we published, and what changed.",
  },
  {
    topic: "transparency",
    date: "2026-04-07",
    title: "Publishing system cards for every launch",
    excerpt:
      "Every Origin model now ships with a public system card — evaluations, limitations, and safeguard coverage, in the open.",
  },
  {
    topic: "transparency",
    date: "2026-03-19",
    title: "How we evaluate before we deploy",
    excerpt:
      "A walkthrough of Origin's pre-deployment evaluation pipeline, from dangerous-capability evals to third-party red teaming.",
  },
  {
    topic: "transparency",
    date: "2022-04-29",
    title: "Origin raises Series B to build steerable systems",
    excerpt:
      "Origin raises a Series B to scale up training of steerable, interpretable, and safe AI systems — and commits to publishing along the way.",
  },
];
