'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'RAG Complete Guide 2026: Retrieval-Augmented Generation — Architecture, Implementation & Best Practices',
    intro: '<strong>Retrieval-Augmented Generation (RAG)</strong> is the dominant pattern for building LLM applications grounded in real, up-to-date data. Instead of relying solely on what a model memorized during training, RAG fetches relevant documents at query time and feeds them as context to the LLM. This guide covers the complete RAG pipeline — from document ingestion and embedding to vector search, advanced retrieval strategies, evaluation with RAGAS, and production deployment patterns — with working Python code examples using LangChain and OpenAI.',
    tldr: '<strong>TL;DR:</strong> RAG = Retrieve relevant documents + Augment the prompt + Generate a grounded answer. It eliminates hallucinations, keeps responses current, and avoids expensive fine-tuning. The pipeline is: Load docs, split into chunks, embed with a model like text-embedding-3-small, store in a vector DB (Pinecone, Qdrant, pgvector), retrieve top-k results at query time, and pass them to the LLM. Advanced techniques include HyDE, parent-child chunks, hybrid search, and re-ranking. Evaluate with RAGAS (faithfulness, relevance, context recall). Production tips: cache embeddings, stream responses, monitor retrieval quality.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'RAG grounds LLM responses in real data, reducing hallucinations by 80-95% compared to vanilla prompting.',
    takeaway2: 'Choose chunk size based on your content: 512 tokens for Q&A, 1024 for summarization, with 10-20% overlap.',
    takeaway3: 'text-embedding-3-small offers the best cost/performance ratio for most use cases at $0.02/1M tokens.',
    takeaway4: 'Hybrid search (dense vectors + sparse BM25) consistently outperforms pure vector similarity search.',
    takeaway5: 'Always evaluate with RAGAS before going to production — measure faithfulness, answer relevance, and context recall.',
    takeaway6: 'Re-ranking with a cross-encoder after initial retrieval significantly improves answer quality for minimal latency cost.',
    h2_what: 'What Is RAG and Why It Matters',
    whatP1: 'Large language models are trained on static datasets with a knowledge cutoff. They cannot access your internal documents, latest API docs, or real-time data. When asked about information outside their training data, they either refuse or — worse — <strong>hallucinate</strong> confident-sounding but incorrect answers.',
    whatP2: 'RAG solves this by introducing a retrieval step before generation. At query time, the system searches a knowledge base for relevant documents, injects them into the prompt as context, and instructs the LLM to answer based on that context. The LLM becomes a reasoning engine over your data rather than a memorization engine.',
    whatP3: 'First described in the 2020 paper by Lewis et al. at Meta, RAG has become the standard architecture for enterprise AI applications, customer support bots, documentation assistants, and any system that needs factual, verifiable answers.',
    h2_comparison: 'RAG vs Fine-Tuning vs Prompt Engineering',
    comparisonP: 'Before building a RAG system, understand when to use each approach:',
    compTable: '<table><thead><tr><th>Criteria</th><th>Prompt Engineering</th><th>RAG</th><th>Fine-Tuning</th></tr></thead><tbody><tr><td>Knowledge update</td><td>Manual prompt edits</td><td>Update docs, re-embed</td><td>Retrain the model</td></tr><tr><td>Cost</td><td>Low (no infra)</td><td>Medium (vector DB + embeddings)</td><td>High (GPU training)</td></tr><tr><td>Latency</td><td>Lowest</td><td>+100-300ms retrieval</td><td>Same as base model</td></tr><tr><td>Accuracy on domain data</td><td>Low</td><td>High</td><td>High</td></tr><tr><td>Hallucination control</td><td>Poor</td><td>Excellent (citations)</td><td>Moderate</td></tr><tr><td>Data freshness</td><td>Static</td><td>Real-time possible</td><td>Stale after training</td></tr><tr><td>Best for</td><td>Simple tasks, formatting</td><td>Knowledge-heavy apps</td><td>Style/behavior changes</td></tr></tbody></table>',
    compSummary: 'In practice, most production systems combine all three: prompt engineering for formatting, RAG for knowledge, and fine-tuning for specialized behavior. But if you are building a knowledge-heavy application, <strong>start with RAG</strong> — it gives you the most impact with the least investment.',
    h2_architecture: 'RAG Architecture: The Complete Pipeline',
    archP1: 'A RAG system has two main phases: an offline <strong>indexing pipeline</strong> that processes your documents, and an online <strong>query pipeline</strong> that handles user questions. Here is the complete architecture:',
    archDiagram: 'Architecture diagram follows',
    archP2: 'The indexing pipeline runs once (or on a schedule) to process your documents. The query pipeline runs for every user question, typically completing in 1-3 seconds end-to-end.',
    h2_loading: 'Step 1: Document Loading',
    loadingP1: 'The first step is loading your source documents into a format the pipeline can process. LangChain provides loaders for virtually every format:',
    loadingP2: 'Each loader returns a list of <code>Document</code> objects with <code>page_content</code> (the text) and <code>metadata</code> (source, page number, etc.). Metadata is critical for citations — always preserve it.',
    h2_splitting: 'Step 2: Text Splitting (Chunking)',
    splittingP1: 'Raw documents are too large to embed or fit in a prompt. You need to split them into chunks. The chunk size directly impacts retrieval quality — <strong>this is the single most important parameter to tune</strong>.',
    splittingP2: 'Common splitting strategies:',
    splittingStrategies: '<ul><li><strong>RecursiveCharacterTextSplitter</strong> — The default choice. Splits on paragraphs, then sentences, then words. Maintains semantic coherence.</li><li><strong>Semantic chunking</strong> — Uses embeddings to detect topic boundaries. Produces variable-size chunks that respect content structure.</li><li><strong>Markdown/HTML splitters</strong> — Splits on headers (h1, h2, h3). Perfect for documentation and structured content.</li><li><strong>Token-based splitting</strong> — Splits by token count rather than characters. More accurate for LLM context window management.</li></ul>',
    splittingGuidelines: '<strong>Chunk size guidelines:</strong> For Q&A systems, use 256-512 tokens with 50-100 token overlap. For summarization, use 1024-2048 tokens. For code, split by function/class boundaries. Always test multiple sizes and measure retrieval accuracy.',
    h2_embedding: 'Step 3: Embedding Models',
    embeddingP1: 'Embeddings convert text chunks into dense numerical vectors that capture semantic meaning. Similar texts produce vectors that are close together in vector space, enabling semantic search.',
    embeddingTable: '<table><thead><tr><th>Model</th><th>Dimensions</th><th>Max Tokens</th><th>Cost (1M tokens)</th><th>Best For</th></tr></thead><tbody><tr><td>OpenAI text-embedding-3-small</td><td>1536</td><td>8191</td><td>$0.02</td><td>General purpose, best cost/perf</td></tr><tr><td>OpenAI text-embedding-3-large</td><td>3072</td><td>8191</td><td>$0.13</td><td>High-accuracy requirements</td></tr><tr><td>Cohere embed-v3</td><td>1024</td><td>512</td><td>$0.10</td><td>Multilingual, search-optimized</td></tr><tr><td>sentence-transformers (all-MiniLM)</td><td>384</td><td>512</td><td>Free (self-hosted)</td><td>Privacy-sensitive, offline</td></tr><tr><td>Ollama (nomic-embed-text)</td><td>768</td><td>8192</td><td>Free (local)</td><td>Local development, no API costs</td></tr><tr><td>Voyage AI voyage-3</td><td>1024</td><td>16000</td><td>$0.06</td><td>Code search, long context</td></tr></tbody></table>',
    embeddingP2: '<strong>Tip:</strong> Start with <code>text-embedding-3-small</code> for prototyping. It handles most use cases well at the lowest cost. Switch to a specialized model only if evaluation metrics show a need.',
    h2_vectorstores: 'Step 4: Vector Stores',
    vectorP1: 'Vector stores index your embeddings for fast similarity search. The choice depends on scale, infrastructure, and query patterns.',
    vectorTable: '<table><thead><tr><th>Vector Store</th><th>Type</th><th>Max Vectors</th><th>Hybrid Search</th><th>Pricing</th><th>Best For</th></tr></thead><tbody><tr><td>Pinecone</td><td>Managed cloud</td><td>Billions</td><td>Yes</td><td>Free tier + pay-as-you-go</td><td>Production SaaS, zero-ops</td></tr><tr><td>Weaviate</td><td>Self-hosted / cloud</td><td>Billions</td><td>Yes (BM25)</td><td>Open source + cloud</td><td>Hybrid search, multi-modal</td></tr><tr><td>Qdrant</td><td>Self-hosted / cloud</td><td>Billions</td><td>Yes (sparse)</td><td>Open source + cloud</td><td>Filtering, payload search</td></tr><tr><td>ChromaDB</td><td>Embedded / self-hosted</td><td>Millions</td><td>No</td><td>Open source</td><td>Prototyping, local dev</td></tr><tr><td>pgvector</td><td>PostgreSQL extension</td><td>Millions</td><td>With pg_trgm</td><td>Free (your Postgres)</td><td>Existing Postgres infra</td></tr><tr><td>FAISS</td><td>In-memory library</td><td>Billions</td><td>No</td><td>Free (Meta)</td><td>Research, batch processing</td></tr></tbody></table>',
    vectorP2: '<strong>Recommendation:</strong> Use ChromaDB or FAISS for prototyping. For production, Pinecone offers the lowest operational burden. If you already run PostgreSQL, pgvector avoids adding a new service. For hybrid search requirements, Weaviate or Qdrant are excellent choices.',
    h2_retrieval: 'Step 5: Retrieval Strategies',
    retrievalP1: 'Retrieval quality determines RAG quality. A perfect LLM cannot generate correct answers from irrelevant context. Here are the key retrieval strategies:',
    retrievalStrategies: '<ul><li><strong>Similarity search (k-NN)</strong> — Basic cosine similarity. Fast and simple. Returns the k most similar chunks.</li><li><strong>Maximum Marginal Relevance (MMR)</strong> — Balances relevance with diversity. Prevents returning k near-duplicate chunks.</li><li><strong>Hybrid search</strong> — Combines dense vector search with sparse keyword search (BM25). Catches both semantic matches and exact keyword matches.</li><li><strong>Re-ranking</strong> — Uses a cross-encoder model to re-score initial results. Dramatically improves precision at minimal latency cost (+50-100ms).</li><li><strong>Contextual compression</strong> — Extracts only the relevant sentences from retrieved chunks, reducing noise in the LLM context.</li></ul>',
    retrievalP2: 'For most production systems, the winning combination is: <strong>hybrid search (dense + BM25) followed by cross-encoder re-ranking</strong>. This consistently outperforms pure vector similarity across benchmarks.',
    h2_generation: 'Step 6: Generation with Context',
    generationP1: 'The final step passes retrieved context to the LLM with a well-crafted prompt. The prompt template is critical — it tells the LLM to use only the provided context and to cite sources.',
    generationP2: 'Key prompt engineering tips for RAG: (1) Explicitly instruct the model to answer only from context. (2) Include source metadata for citations. (3) Tell the model to say "I don\'t know" when context is insufficient. (4) Use system messages for consistent behavior.',
    h2_advanced: 'Advanced RAG Techniques',
    advancedP1: 'Once your basic RAG pipeline works, these techniques can significantly improve quality:',
    advHyde: '<strong>HyDE (Hypothetical Document Embeddings):</strong> Instead of embedding the user query directly, first ask the LLM to generate a hypothetical answer, then embed that answer for retrieval. This bridges the gap between question-style queries and document-style content. Improves recall by 10-25% on many benchmarks.',
    advParent: '<strong>Parent-child chunks:</strong> Index small chunks (256 tokens) for precise retrieval, but return the parent chunk (1024-2048 tokens) as context. This gives the LLM more surrounding context while maintaining retrieval precision.',
    advMultiQuery: '<strong>Multi-query retrieval:</strong> Generate 3-5 reformulations of the user query using an LLM, run retrieval for each, and merge results. Catches relevant documents that a single query phrasing might miss.',
    advCompression: '<strong>Contextual compression:</strong> After retrieval, use a smaller LLM to extract only the relevant sentences from each chunk. Reduces noise and fits more useful information in the context window.',
    advRouting: '<strong>Query routing:</strong> Classify the query type (factual lookup, comparison, how-to, etc.) and route to different retrieval strategies or knowledge bases. A simple classifier can dramatically improve results.',
    h2_code: 'Complete RAG Implementation (Python)',
    codeP1: 'Here is a complete working RAG pipeline using LangChain, OpenAI, and ChromaDB. This covers document loading, chunking, embedding, indexing, and querying:',
    codeP2: 'The code above creates a complete RAG pipeline in under 50 lines. For production, you would add error handling, streaming, caching, and swap ChromaDB for a managed vector store.',
    h2_advanced_code: 'Advanced: Hybrid Search with Re-ranking',
    advCodeP1: 'This example adds BM25 hybrid search and cross-encoder re-ranking for significantly better retrieval quality:',
    h2_evaluation: 'Evaluating RAG Quality with RAGAS',
    evalP1: 'You cannot improve what you do not measure. <strong>RAGAS</strong> (Retrieval-Augmented Generation Assessment) is the standard framework for evaluating RAG pipelines. It measures four key metrics:',
    evalMetrics: '<ul><li><strong>Faithfulness</strong> — Are the generated claims supported by the retrieved context? (Reduces hallucinations)</li><li><strong>Answer relevance</strong> — Is the answer actually relevant to the question asked?</li><li><strong>Context precision</strong> — Are the retrieved chunks relevant? Are irrelevant chunks excluded?</li><li><strong>Context recall</strong> — Did the retriever find all the relevant information needed to answer?</li></ul>',
    evalP2: 'Run RAGAS on a test set of 50-100 questions with known answers. A faithfulness score below 0.8 indicates your RAG system is hallucinating. Context recall below 0.7 means your retriever is missing relevant documents.',
    h2_production: 'Production Considerations',
    prodP1: 'Moving from prototype to production requires addressing several concerns:',
    prodCaching: '<strong>Caching:</strong> Cache embedding results for identical queries. Cache LLM responses for identical query + context combinations. Use Redis or a simple in-memory LRU cache. This reduces costs by 40-60% in typical workloads.',
    prodStreaming: '<strong>Streaming:</strong> Stream the LLM response token by token. Users perceive the system as faster when they see partial responses. LangChain and OpenAI both support streaming natively.',
    prodCost: '<strong>Cost optimization:</strong> Use text-embedding-3-small (not large) unless evaluation shows a need. Batch embedding requests. Cache aggressively. Consider a smaller model (GPT-4o-mini) for simple queries and route complex ones to GPT-4o.',
    prodMonitoring: '<strong>Monitoring:</strong> Log every query, retrieved chunks, and generated answer. Track retrieval latency, generation latency, and user feedback. Set up alerts for faithfulness drops. Tools: LangSmith, Phoenix, Weights & Biases.',
    prodSecurity: '<strong>Security:</strong> Implement access control on documents — users should only retrieve documents they are authorized to see. Sanitize user queries to prevent prompt injection. Never expose raw retrieved chunks in the UI without filtering.',
    h2_pitfalls: 'Common Pitfalls and How to Avoid Them',
    pitfallsP1: 'These are the mistakes that trip up most RAG implementations:',
    pitfalls: '<ul><li><strong>Chunk size too large</strong> — Retrieves irrelevant content that dilutes the answer. Start with 512 tokens and tune down.</li><li><strong>No overlap between chunks</strong> — Sentences at chunk boundaries get split. Always use 10-20% overlap.</li><li><strong>Ignoring metadata</strong> — Without source tracking, you cannot provide citations or filter by document type/date.</li><li><strong>Wrong embedding model</strong> — Using a generic model for specialized content (code, legal, medical). Evaluate domain-specific models.</li><li><strong>Too many retrieved chunks</strong> — Stuffing 20 chunks into the context adds noise. Use 3-5 chunks with re-ranking for better results.</li><li><strong>No evaluation</strong> — Flying blind without RAGAS or similar metrics. Always measure before and after changes.</li><li><strong>Context window overflow</strong> — Not accounting for chunk size x number of chunks x prompt template tokens. Calculate total tokens and stay within limits.</li><li><strong>Stale embeddings</strong> — Updating documents but not re-embedding them. Set up incremental indexing pipelines.</li></ul>',
    h2_monitoring: 'Monitoring and Observability',
    monitoringP1: 'A RAG system without monitoring is a system waiting to fail silently. You need visibility into every stage of the pipeline:',
    monitoringList: '<ul><li><strong>Retrieval latency:</strong> Measure time from query to retrieved chunks. Alert if it exceeds 500ms. Slow retrieval usually means your index needs optimization or your vector store is undersized.</li><li><strong>Retrieval relevance:</strong> Sample 1% of queries and have annotators rate whether retrieved chunks are relevant. Declining relevance often means your knowledge base has changed but embeddings are stale.</li><li><strong>Generation quality:</strong> Track user feedback (thumbs up/down, corrections). Run weekly RAGAS evaluations on a fixed test set. Faithfulness drops indicate prompt or retrieval regressions.</li><li><strong>Token usage and cost:</strong> Track tokens consumed per query (embedding + generation). Set budget alerts. Identify expensive queries that could be served by a smaller model.</li><li><strong>Error rates:</strong> Monitor embedding API errors, vector store timeouts, and LLM failures. Set up fallbacks: if primary retrieval fails, serve a cached response or gracefully degrade.</li></ul>',
    monitoringP2: 'LangSmith, Phoenix (Arize), and Weights & Biases Traces are the leading observability tools for LLM applications. LangSmith integrates seamlessly with LangChain and provides trace visualization, evaluation, and cost tracking out of the box.',
    h2_pgvector: 'Production Setup: pgvector with PostgreSQL',
    pgvectorP1: 'If your team already runs PostgreSQL, pgvector is the easiest path to production. No new infrastructure, no new vendor — just an extension on your existing database:',
    pgvectorP2: 'pgvector supports IVFFlat and HNSW indexes for fast approximate nearest neighbor search. For up to 1 million vectors, it performs well without sharding. Beyond that, consider a dedicated vector store.',
    h2_agentic: 'RAG vs Agentic RAG',
    agenticP1: 'Traditional RAG follows a fixed pipeline: retrieve then generate. <strong>Agentic RAG</strong> gives the LLM control over the retrieval process itself — it can decide when to search, what to search for, whether to search again, and when it has enough context to answer.',
    agenticP2: 'In an agentic RAG system, the LLM acts as a reasoning agent that can call retrieval as a tool. If the first retrieval does not return relevant results, the agent reformulates the query and tries again. It can also combine information from multiple searches, verify facts across sources, and decide when to give up gracefully.',
    agenticP3: 'Agentic RAG is particularly powerful for complex questions that require multi-step reasoning: "Compare the pricing of products X, Y, and Z" requires three separate retrievals that a fixed pipeline cannot handle elegantly. Frameworks like LangGraph and CrewAI make it straightforward to build agentic RAG systems.',
    h2_multimodal: 'Multi-Modal RAG: Beyond Text',
    multimodalP1: 'Modern RAG is not limited to text. Multi-modal RAG can index and retrieve from images, tables, and structured data:',
    multimodalList: '<ul><li><strong>Table extraction:</strong> Use Unstructured or Docling to extract tables from PDFs. Convert tables to markdown or JSON before chunking. Tables contain dense information that pure text extraction misses.</li><li><strong>Image understanding:</strong> Use GPT-4o or Claude to generate text descriptions of diagrams, charts, and screenshots. Index these descriptions as searchable text alongside the original image reference.</li><li><strong>Structured data:</strong> For databases and APIs, generate natural language summaries of schema and sample data. Use text-to-SQL for queries that need real-time database access.</li><li><strong>Code repositories:</strong> Index functions, classes, and docstrings separately. Use code-specific embedding models (Voyage AI voyage-code-3) for better semantic matching on code content.</li></ul>',
    multimodalP2: 'Multi-modal RAG adds complexity but significantly improves coverage. Start with text-only RAG, then add modalities based on what your users are asking about but not finding answers for.',
    h2_preprocessing: 'Document Preprocessing Tips',
    preprocessingP1: 'The quality of your input documents directly determines RAG quality. Garbage in, garbage out. Here are preprocessing best practices:',
    preprocessingList: '<ul><li><strong>Clean HTML artifacts:</strong> Strip navigation, footers, ads, and boilerplate before indexing. Use readability libraries or Unstructured to extract main content.</li><li><strong>Normalize formatting:</strong> Convert all documents to consistent markdown. Standardize headers, lists, and code blocks across sources.</li><li><strong>Deduplicate:</strong> Remove duplicate or near-duplicate documents before indexing. Duplicates waste storage and can cause redundant retrieval results.</li><li><strong>Add metadata:</strong> Enrich each document with title, author, date, category, and source URL. This metadata enables filtering and improves citation quality.</li><li><strong>Handle OCR content:</strong> PDFs from scanned documents need OCR. Use Tesseract or cloud OCR services. Post-process OCR output to fix common errors.</li><li><strong>Validate encoding:</strong> Ensure all text is UTF-8. Mixed encodings cause silent corruption in embeddings and retrieval.</li></ul>',
    h2_checklist: 'Getting Started Checklist',
    checklistP1: 'Follow this checklist to build your first RAG pipeline from scratch:',
    checklistItems: '<ol><li><strong>Define your knowledge source</strong> — Identify the documents, databases, or APIs that contain the answers your users need. Start with a small, well-curated dataset of 50-100 documents.</li><li><strong>Choose your tech stack</strong> — For most teams: Python + LangChain + OpenAI + ChromaDB. This gets you from zero to working prototype in under an hour.</li><li><strong>Set up document loading</strong> — Use appropriate loaders for your document types. Preserve metadata (source URL, page number, section title) for citations.</li><li><strong>Tune your chunking</strong> — Start with RecursiveCharacterTextSplitter at 512 tokens with 50 token overlap. Adjust based on your content type and retrieval accuracy.</li><li><strong>Generate and store embeddings</strong> — Use text-embedding-3-small. Store in ChromaDB locally or Pinecone for cloud persistence.</li><li><strong>Build the retrieval chain</strong> — Start with simple similarity search (k=4). Add MMR if you see duplicate results.</li><li><strong>Write your prompt template</strong> — Instruct the LLM to answer only from context and cite sources. Test with 10 representative questions.</li><li><strong>Evaluate with RAGAS</strong> — Create a test set of 50+ questions with ground-truth answers. Measure faithfulness, relevance, and recall.</li><li><strong>Iterate and improve</strong> — Tune chunk size, try hybrid search, add re-ranking. Each change should improve RAGAS scores.</li><li><strong>Deploy</strong> — Add streaming, caching, error handling, and monitoring. Use LangSmith or a similar observability tool.</li></ol>',
    h2_streaming: 'Streaming RAG Responses',
    streamingP1: 'Users expect real-time responses. Streaming delivers tokens as they are generated rather than waiting for the complete response. Here is how to implement streaming with LangChain:',
    streamingP2: 'Streaming reduces perceived latency from 3-5 seconds to under 500ms for first token. Always implement streaming in user-facing applications — the impact on user experience is dramatic.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is RAG in AI and how does it work?',
    faq1_a: 'RAG (Retrieval-Augmented Generation) is an architecture that enhances LLM responses by retrieving relevant documents from a knowledge base at query time and injecting them into the prompt. The LLM then generates answers grounded in this retrieved context rather than relying solely on its training data, reducing hallucinations and enabling access to current information.',
    faq2_q: 'When should I use RAG vs fine-tuning?',
    faq2_a: 'Use RAG when you need the LLM to answer from specific documents, databases, or frequently updated content. Use fine-tuning when you need to change the model behavior, tone, or teach it specialized reasoning patterns. RAG is faster to implement, cheaper to maintain, and better at providing citations. Most production systems start with RAG and add fine-tuning only when needed.',
    faq3_q: 'What is the best chunk size for RAG?',
    faq3_a: 'There is no universal best chunk size. For Q&A systems, 256-512 tokens with 50-100 token overlap works well. For summarization, 1024-2048 tokens. For code, split by function or class boundaries. The key is to measure: create a test set, try different chunk sizes, and pick the one with the highest retrieval accuracy using RAGAS metrics.',
    faq4_q: 'Which vector database should I use for RAG?',
    faq4_a: 'For prototyping, use ChromaDB (embedded, zero config) or FAISS (in-memory). For production SaaS, Pinecone offers the best managed experience. If you already use PostgreSQL, pgvector avoids new infrastructure. For advanced hybrid search, Weaviate or Qdrant are strong choices. The best vector DB is the one that fits your existing infrastructure.',
    faq5_q: 'How do I reduce hallucinations in RAG?',
    faq5_a: 'Five strategies: (1) Improve retrieval quality with hybrid search and re-ranking so the LLM gets better context. (2) Use explicit prompt instructions telling the model to answer only from provided context. (3) Add citations — require the model to reference specific source documents. (4) Use contextual compression to remove irrelevant content from chunks. (5) Measure faithfulness with RAGAS and iterate.',
    faq6_q: 'What embedding model is best for RAG in 2026?',
    faq6_a: 'OpenAI text-embedding-3-small is the best general-purpose choice at $0.02 per million tokens. For multilingual use cases, Cohere embed-v3 excels. For private or offline deployments, sentence-transformers or Ollama nomic-embed-text are strong free options. For code search, Voyage AI voyage-3 leads. Always benchmark on your specific data before choosing.',
    faq7_q: 'How do I evaluate RAG pipeline quality?',
    faq7_a: 'Use the RAGAS framework which measures four metrics: faithfulness (are answers supported by context), answer relevance (does the answer address the question), context precision (are retrieved chunks relevant), and context recall (did retrieval find all needed information). Create a test set of 50-100 questions with ground-truth answers and run RAGAS evaluation after every pipeline change.',
    faq8_q: 'What is hybrid search in RAG and why is it better?',
    faq8_a: 'Hybrid search combines dense vector similarity search with sparse keyword search like BM25. Dense search catches semantic meaning (synonyms, paraphrases) while sparse search catches exact keyword matches (product names, error codes, acronyms). Together they outperform either approach alone. Most modern vector stores support hybrid search natively.',
    h2_frameworks: 'RAG Frameworks Comparison',
    frameworksP1: 'Several frameworks simplify RAG development. Here is how the major options compare:',
    frameworksTable: '<table><thead><tr><th>Framework</th><th>Language</th><th>Strengths</th><th>Weaknesses</th><th>Best For</th></tr></thead><tbody><tr><td>LangChain</td><td>Python, JS</td><td>Largest ecosystem, most integrations, excellent docs</td><td>Abstraction overhead, frequent breaking changes</td><td>General RAG, rapid prototyping</td></tr><tr><td>LlamaIndex</td><td>Python</td><td>Purpose-built for RAG, advanced indexing strategies</td><td>Steeper learning curve, smaller community</td><td>Complex document indexing</td></tr><tr><td>Haystack</td><td>Python</td><td>Pipeline-first design, production-focused</td><td>Less flexible for custom flows</td><td>Enterprise pipelines</td></tr><tr><td>Semantic Kernel</td><td>C#, Python</td><td>Microsoft ecosystem, Azure integration</td><td>Newer, fewer examples</td><td>.NET / Azure shops</td></tr><tr><td>Vercel AI SDK</td><td>TypeScript</td><td>Streaming-first, React integration</td><td>Less mature RAG tooling</td><td>Next.js web apps</td></tr></tbody></table>',
    frameworksP2: '<strong>Our recommendation:</strong> Start with LangChain for its ecosystem breadth and documentation. If your use case is heavily document-oriented with complex indexing needs, evaluate LlamaIndex. For TypeScript web applications, the Vercel AI SDK is increasingly capable.',
    h2_usecases: 'Real-World RAG Use Cases',
    usecasesP1: 'RAG is not a theoretical concept — it powers thousands of production applications today:',
    usecasesList: '<ul><li><strong>Internal knowledge base Q&A:</strong> Employees ask questions about company policies, HR documents, engineering runbooks. RAG retrieves from Confluence, Notion, or SharePoint and answers with citations.</li><li><strong>Customer support chatbots:</strong> AI agents search product documentation, past support tickets, and FAQs to resolve customer issues. Reduces human agent workload by 40-60%.</li><li><strong>Legal document analysis:</strong> Lawyers query thousands of contracts, regulations, and case law. RAG finds relevant clauses and summarizes precedents.</li><li><strong>Code assistant:</strong> Developers ask questions about their codebase. RAG searches indexed source code, READMEs, and architecture docs to provide context-aware answers.</li><li><strong>Medical research:</strong> Researchers query PubMed papers, clinical trial data, and drug interaction databases. RAG surfaces relevant studies with proper citations.</li></ul>',
    h2_cost: 'Cost Estimation Guide',
    costP1: 'Understanding RAG costs helps with budgeting. Here is a breakdown for a typical knowledge base with 10,000 documents (averaging 2,000 tokens each):',
    costTable: '<table><thead><tr><th>Component</th><th>Calculation</th><th>Monthly Cost</th></tr></thead><tbody><tr><td>Initial embedding (one-time)</td><td>20M tokens x $0.02/1M</td><td>$0.40</td></tr><tr><td>Vector storage (Pinecone)</td><td>~100K vectors, free tier</td><td>$0</td></tr><tr><td>Query embeddings (1K queries/day)</td><td>30K queries x 100 tokens avg</td><td>$0.06</td></tr><tr><td>LLM generation (GPT-4o-mini)</td><td>30K queries x 2K tokens avg</td><td>$9.00</td></tr><tr><td>LLM generation (GPT-4o)</td><td>30K queries x 2K tokens avg</td><td>$75.00</td></tr><tr><td>Re-ranking (optional, self-hosted)</td><td>GPU instance</td><td>$50-150</td></tr></tbody></table>',
    costP2: '<strong>Key insight:</strong> Embedding costs are negligible. The LLM generation model choice dominates your bill. Use GPT-4o-mini for 80% of queries and route only complex ones to GPT-4o. This "model routing" strategy can cut costs by 60-70%.',
    conclusion: '<strong>RAG is the most practical and impactful architecture for building LLM applications</strong> that need grounded, accurate, and up-to-date answers. Start simple with a basic pipeline (LangChain + OpenAI + ChromaDB), measure with RAGAS, then iterate. Add hybrid search and re-ranking when you need better retrieval. The ecosystem is mature and the tools are production-ready — the key differentiator is how well you tune your chunking, retrieval, and prompts for your specific data and use case.',
  },
  zh: {
    title: 'RAG 完全指南 2026：检索增强生成 — 架构、实现与最佳实践',
    intro: '<strong>检索增强生成（RAG）</strong>是构建基于真实数据的 LLM 应用的主流架构。RAG 不依赖模型训练时的记忆，而是在查询时从知识库检索相关文档并作为上下文传递给 LLM。本指南涵盖完整的 RAG 流水线 — 从文档加载、向量化、向量检索到高级策略、RAGAS 评估和生产部署，包含 LangChain + OpenAI 的 Python 代码示例。',
    tldr: '<strong>要点概括：</strong>RAG = 检索相关文档 + 增强提示词 + 生成有依据的答案。消除幻觉、保持实时性、避免昂贵的微调。流程：加载文档、分块、用 text-embedding-3-small 嵌入、存入向量数据库（Pinecone、Qdrant、pgvector），查询时检索 top-k 结果传给 LLM。高级技术包括 HyDE、父子分块、混合搜索和重排序。用 RAGAS 评估（忠实度、相关性、上下文召回率）。',
    takeaways_title: '核心要点',
    takeaway1: 'RAG 将 LLM 回答锚定在真实数据上，与纯提示相比可减少 80-95% 的幻觉。',
    takeaway2: '根据内容选择分块大小：Q&A 用 512 tokens，摘要用 1024 tokens，保持 10-20% 重叠。',
    takeaway3: 'text-embedding-3-small 以 $0.02/百万 tokens 的价格提供最优性价比。',
    takeaway4: '混合搜索（稠密向量 + 稀疏 BM25）始终优于纯向量相似度搜索。',
    takeaway5: '上线前必须用 RAGAS 评估 — 测量忠实度、答案相关性和上下文召回率。',
    takeaway6: '初始检索后用交叉编码器重排序可显著提升答案质量，延迟成本极小。',
    h2_what: '什么是 RAG，为什么重要',
    whatP1: '大语言模型在静态数据集上训练，有知识截止日期。它们无法访问您的内部文档、最新 API 文档或实时数据。当被问到训练数据之外的信息时，它们要么拒绝回答，要么更糟 — <strong>产生幻觉</strong>，给出听起来自信但实际错误的答案。',
    whatP2: 'RAG 通过在生成之前引入检索步骤来解决这个问题。在查询时，系统在知识库中搜索相关文档，将其注入提示作为上下文，并指示 LLM 基于该上下文回答。LLM 成为数据上的推理引擎，而非记忆引擎。',
    whatP3: '2020 年 Meta 的 Lewis 等人首次提出 RAG，目前已成为企业 AI 应用、客服机器人、文档助手等需要事实性可验证答案的系统的标准架构。',
    h2_comparison: 'RAG vs 微调 vs 提示工程',
    comparisonP: '在构建 RAG 系统之前，了解何时使用哪种方法：',
    compTable: '<table><thead><tr><th>标准</th><th>提示工程</th><th>RAG</th><th>微调</th></tr></thead><tbody><tr><td>知识更新</td><td>手动修改提示</td><td>更新文档，重新嵌入</td><td>重新训练模型</td></tr><tr><td>成本</td><td>低</td><td>中等（向量库+嵌入）</td><td>高（GPU 训练）</td></tr><tr><td>延迟</td><td>最低</td><td>+100-300ms 检索</td><td>与基础模型相同</td></tr><tr><td>领域数据准确性</td><td>低</td><td>高</td><td>高</td></tr><tr><td>幻觉控制</td><td>差</td><td>优秀（可引用）</td><td>中等</td></tr><tr><td>数据时效性</td><td>静态</td><td>可实时</td><td>训练后过时</td></tr><tr><td>适用场景</td><td>简单任务、格式化</td><td>知识密集型应用</td><td>风格/行为调整</td></tr></tbody></table>',
    compSummary: '实际上，大多数生产系统三者结合：提示工程控制格式，RAG 提供知识，微调调整专业行为。但如果你在构建知识密集型应用，<strong>从 RAG 开始</strong> — 它以最小投入带来最大收益。',
    h2_architecture: 'RAG 架构：完整流水线',
    archP1: 'RAG 系统有两个主要阶段：离线<strong>索引流水线</strong>处理文档，在线<strong>查询流水线</strong>处理用户问题。以下是完整架构：',
    archDiagram: '架构图如下',
    archP2: '索引流水线运行一次（或定时运行）处理文档。查询流水线对每个用户问题运行，端到端通常在 1-3 秒内完成。',
    h2_loading: '第一步：文档加载',
    loadingP1: '第一步是将源文档加载为流水线可处理的格式。LangChain 提供了几乎所有格式的加载器：',
    loadingP2: '每个加载器返回 <code>Document</code> 对象列表，包含 <code>page_content</code>（文本）和 <code>metadata</code>（来源、页码等）。元数据对引用至关重要 — 务必保留。',
    h2_splitting: '第二步：文本分割（分块）',
    splittingP1: '原始文档太大，无法直接嵌入或放入提示。你需要将它们分割成块。分块大小直接影响检索质量 — <strong>这是最需要调优的参数</strong>。',
    splittingP2: '常用分割策略：',
    splittingStrategies: '<ul><li><strong>RecursiveCharacterTextSplitter</strong> — 默认选择。按段落、句子、单词依次分割，保持语义连贯。</li><li><strong>语义分块</strong> — 用嵌入检测主题边界，生成尊重内容结构的可变大小块。</li><li><strong>Markdown/HTML 分割器</strong> — 按标题（h1、h2、h3）分割，适合文档和结构化内容。</li><li><strong>基于 Token 的分割</strong> — 按 token 数而非字符数分割，更准确地管理 LLM 上下文窗口。</li></ul>',
    splittingGuidelines: '<strong>分块大小指南：</strong>Q&A 系统用 256-512 tokens，50-100 token 重叠。摘要用 1024-2048 tokens。代码按函数/类边界分割。务必测试多种大小并用 RAGAS 衡量检索准确率。',
    h2_embedding: '第三步：嵌入模型',
    embeddingP1: '嵌入将文本块转换为捕获语义含义的稠密数值向量。语义相似的文本产生在向量空间中接近的向量，从而实现语义搜索。',
    embeddingTable: '<table><thead><tr><th>模型</th><th>维度</th><th>最大 Tokens</th><th>费用（百万tokens）</th><th>适用场景</th></tr></thead><tbody><tr><td>OpenAI text-embedding-3-small</td><td>1536</td><td>8191</td><td>$0.02</td><td>通用，最优性价比</td></tr><tr><td>OpenAI text-embedding-3-large</td><td>3072</td><td>8191</td><td>$0.13</td><td>高精度需求</td></tr><tr><td>Cohere embed-v3</td><td>1024</td><td>512</td><td>$0.10</td><td>多语言，搜索优化</td></tr><tr><td>sentence-transformers</td><td>384</td><td>512</td><td>免费（自部署）</td><td>隐私敏感，离线</td></tr><tr><td>Ollama nomic-embed-text</td><td>768</td><td>8192</td><td>免费（本地）</td><td>本地开发，无 API 费用</td></tr><tr><td>Voyage AI voyage-3</td><td>1024</td><td>16000</td><td>$0.06</td><td>代码搜索，长上下文</td></tr></tbody></table>',
    embeddingP2: '<strong>建议：</strong>原型阶段从 <code>text-embedding-3-small</code> 开始，它以最低成本覆盖大多数场景。只有在评估指标显示需要时才切换到专用模型。',
    h2_vectorstores: '第四步：向量数据库',
    vectorP1: '向量数据库为嵌入建立索引以支持快速相似度搜索。选择取决于规模、基础设施和查询模式。',
    vectorTable: '<table><thead><tr><th>向量数据库</th><th>类型</th><th>最大向量数</th><th>混合搜索</th><th>定价</th><th>适用场景</th></tr></thead><tbody><tr><td>Pinecone</td><td>托管云</td><td>数十亿</td><td>是</td><td>免费层+按量付费</td><td>生产 SaaS，零运维</td></tr><tr><td>Weaviate</td><td>自部署/云</td><td>数十亿</td><td>是（BM25）</td><td>开源+云</td><td>混合搜索，多模态</td></tr><tr><td>Qdrant</td><td>自部署/云</td><td>数十亿</td><td>是（稀疏）</td><td>开源+云</td><td>过滤，载荷搜索</td></tr><tr><td>ChromaDB</td><td>嵌入式/自部署</td><td>百万级</td><td>否</td><td>开源</td><td>原型，本地开发</td></tr><tr><td>pgvector</td><td>PostgreSQL 扩展</td><td>百万级</td><td>配合 pg_trgm</td><td>免费</td><td>已有 Postgres 基础设施</td></tr><tr><td>FAISS</td><td>内存库</td><td>数十亿</td><td>否</td><td>免费（Meta）</td><td>研究，批处理</td></tr></tbody></table>',
    vectorP2: '<strong>推荐：</strong>原型阶段用 ChromaDB 或 FAISS。生产环境 Pinecone 运维负担最低。如果已用 PostgreSQL，pgvector 避免引入新服务。混合搜索需求选 Weaviate 或 Qdrant。',
    h2_retrieval: '第五步：检索策略',
    retrievalP1: '检索质量决定 RAG 质量。完美的 LLM 也无法从不相关的上下文生成正确答案。以下是关键检索策略：',
    retrievalStrategies: '<ul><li><strong>相似度搜索（k-NN）</strong> — 基本余弦相似度。快速简单，返回 k 个最相似的块。</li><li><strong>最大边际相关性（MMR）</strong> — 平衡相关性和多样性，防止返回 k 个近乎重复的块。</li><li><strong>混合搜索</strong> — 结合稠密向量搜索和稀疏关键词搜索（BM25），同时捕获语义匹配和精确关键词匹配。</li><li><strong>重排序</strong> — 用交叉编码器模型对初始结果重新评分，以极小的延迟成本（+50-100ms）显著提升精确度。</li><li><strong>上下文压缩</strong> — 仅从检索块中提取相关句子，减少 LLM 上下文中的噪音。</li></ul>',
    retrievalP2: '对大多数生产系统，最优组合是：<strong>混合搜索（稠密+BM25）+ 交叉编码器重排序</strong>。在各种基准测试中，这始终优于纯向量相似度搜索。',
    h2_generation: '第六步：基于上下文生成',
    generationP1: '最后一步将检索到的上下文与精心设计的提示一起传递给 LLM。提示模板至关重要 — 它告诉 LLM 仅使用提供的上下文并引用来源。',
    generationP2: 'RAG 提示工程要点：(1) 明确指示模型仅从上下文回答。(2) 包含来源元数据以供引用。(3) 告诉模型在上下文不足时回答"我不知道"。(4) 使用系统消息保持一致行为。',
    h2_advanced: '高级 RAG 技术',
    advancedP1: '基础 RAG 流水线运行后，以下技术可显著提升质量：',
    advHyde: '<strong>HyDE（假设文档嵌入）：</strong>不直接嵌入用户查询，而是先让 LLM 生成假设答案，然后嵌入该答案进行检索。这弥合了问题式查询和文档式内容之间的差距，在许多基准上提升 10-25% 的召回率。',
    advParent: '<strong>父子分块：</strong>索引小块（256 tokens）以实现精确检索，但返回父块（1024-2048 tokens）作为上下文。在保持检索精确度的同时给 LLM 更多上下文。',
    advMultiQuery: '<strong>多查询检索：</strong>用 LLM 生成 3-5 个查询改写，对每个运行检索并合并结果。捕获单一查询表述可能遗漏的相关文档。',
    advCompression: '<strong>上下文压缩：</strong>检索后用小型 LLM 从每个块中仅提取相关句子。减少噪音，在上下文窗口中放入更多有用信息。',
    advRouting: '<strong>查询路由：</strong>分类查询类型（事实查找、比较、操作指南等），路由到不同的检索策略或知识库。简单的分类器可大幅提升结果。',
    h2_code: '完整 RAG 实现（Python）',
    codeP1: '以下是使用 LangChain、OpenAI 和 ChromaDB 的完整 RAG 流水线代码，涵盖文档加载、分块、嵌入、索引和查询：',
    codeP2: '以上代码用不到 50 行创建了完整的 RAG 流水线。生产环境需添加错误处理、流式传输、缓存，并将 ChromaDB 换为托管向量存储。',
    h2_advanced_code: '进阶：混合搜索与重排序',
    advCodeP1: '本示例添加 BM25 混合搜索和交叉编码器重排序，显著提升检索质量：',
    h2_evaluation: '用 RAGAS 评估 RAG 质量',
    evalP1: '不能衡量就无法改进。<strong>RAGAS</strong>（检索增强生成评估）是评估 RAG 流水线的标准框架，测量四个关键指标：',
    evalMetrics: '<ul><li><strong>忠实度</strong> — 生成的断言是否有检索上下文支持？（减少幻觉）</li><li><strong>答案相关性</strong> — 答案是否真正与所提问题相关？</li><li><strong>上下文精确度</strong> — 检索的块是否相关？不相关的块是否被排除？</li><li><strong>上下文召回率</strong> — 检索器是否找到了回答所需的所有相关信息？</li></ul>',
    evalP2: '在 50-100 个有标准答案的问题测试集上运行 RAGAS。忠实度低于 0.8 说明 RAG 系统在产生幻觉。上下文召回率低于 0.7 说明检索器遗漏了相关文档。',
    h2_production: '生产环境注意事项',
    prodP1: '从原型到生产需要解决以下问题：',
    prodCaching: '<strong>缓存：</strong>缓存相同查询的嵌入结果。缓存相同查询+上下文组合的 LLM 响应。使用 Redis 或简单内存 LRU 缓存。典型工作负载可减少 40-60% 成本。',
    prodStreaming: '<strong>流式传输：</strong>逐 token 流式传输 LLM 响应。用户看到部分响应时会感觉系统更快。LangChain 和 OpenAI 都原生支持流式传输。',
    prodCost: '<strong>成本优化：</strong>除非评估需要，否则用 text-embedding-3-small。批量嵌入请求。积极缓存。简单查询用小模型（GPT-4o-mini），复杂查询路由到 GPT-4o。',
    prodMonitoring: '<strong>监控：</strong>记录每个查询、检索块和生成答案。跟踪检索延迟、生成延迟和用户反馈。设置忠实度下降告警。工具：LangSmith、Phoenix、W&B。',
    prodSecurity: '<strong>安全：</strong>对文档实施访问控制 — 用户只能检索有权查看的文档。清洗用户查询以防止提示注入。不要在 UI 中未经过滤地暴露原始检索块。',
    h2_pitfalls: '常见陷阱及避免方法',
    pitfallsP1: '以下是大多数 RAG 实现中常犯的错误：',
    pitfalls: '<ul><li><strong>分块太大</strong> — 检索到不相关内容稀释答案。从 512 tokens 开始逐步调小。</li><li><strong>块之间无重叠</strong> — 块边界处的句子被截断。始终使用 10-20% 重叠。</li><li><strong>忽略元数据</strong> — 没有来源跟踪就无法提供引用或按文档类型/日期过滤。</li><li><strong>嵌入模型选择不当</strong> — 对专业内容（代码、法律、医疗）使用通用模型。评估领域专用模型。</li><li><strong>检索块过多</strong> — 塞入 20 个块增加噪音。用 3-5 个块加重排序效果更好。</li><li><strong>无评估</strong> — 没有 RAGAS 等指标就是盲飞。改动前后必须测量。</li><li><strong>上下文窗口溢出</strong> — 未计算分块大小 x 块数 x 提示模板 tokens。计算总 tokens 并控制在限制内。</li><li><strong>嵌入过时</strong> — 更新文档但不重新嵌入。建立增量索引流水线。</li></ul>',
    h2_monitoring: '监控与可观测性',
    monitoringP1: '没有监控的 RAG 系统是等待静默失败的系统。你需要对流水线每个阶段的可见性：',
    monitoringList: '<ul><li><strong>检索延迟：</strong>测量从查询到检索块的时间。超过 500ms 需告警。慢检索通常意味着索引需要优化或向量存储容量不足。</li><li><strong>检索相关性：</strong>抽样 1% 查询让标注员评估检索块是否相关。相关性下降通常意味着知识库已变化但嵌入过时。</li><li><strong>生成质量：</strong>跟踪用户反馈（点赞/踩、修正）。每周在固定测试集上运行 RAGAS 评估。忠实度下降表明提示或检索出现回归。</li><li><strong>Token 用量和成本：</strong>跟踪每次查询消耗的 tokens（嵌入+生成）。设置预算告警。识别可用小模型处理的高成本查询。</li><li><strong>错误率：</strong>监控嵌入 API 错误、向量存储超时和 LLM 失败。设置回退：主检索失败时返回缓存响应或优雅降级。</li></ul>',
    monitoringP2: 'LangSmith、Phoenix（Arize）和 Weights & Biases Traces 是 LLM 应用的领先可观测性工具。LangSmith 与 LangChain 无缝集成，开箱即提供追踪可视化、评估和成本跟踪。',
    h2_pgvector: '生产部署：pgvector + PostgreSQL',
    pgvectorP1: '如果团队已经使用 PostgreSQL，pgvector 是最简单的生产路径。无需新基础设施、无需新供应商 — 只是现有数据库上的一个扩展：',
    pgvectorP2: 'pgvector 支持 IVFFlat 和 HNSW 索引进行快速近似最近邻搜索。100 万向量以内无需分片即可良好运行。超过此规模，考虑专用向量存储。',
    h2_agentic: 'RAG vs 智能体 RAG',
    agenticP1: '传统 RAG 遵循固定流水线：先检索后生成。<strong>智能体 RAG</strong> 让 LLM 控制检索过程本身 — 它可以决定何时搜索、搜索什么、是否再次搜索以及何时有足够上下文回答。',
    agenticP2: '在智能体 RAG 系统中，LLM 作为推理智能体可以调用检索作为工具。如果首次检索未返回相关结果，智能体会重新构造查询并重试。它还可以组合多次搜索的信息、跨来源验证事实，并在无法回答时优雅退出。',
    agenticP3: '智能体 RAG 对需要多步推理的复杂问题特别强大："比较产品 X、Y 和 Z 的定价"需要三次独立检索，固定流水线无法优雅处理。LangGraph 和 CrewAI 等框架让构建智能体 RAG 系统变得简单。',
    h2_multimodal: '多模态 RAG：超越文本',
    multimodalP1: '现代 RAG 不限于文本。多模态 RAG 可以索引和检索图像、表格和结构化数据：',
    multimodalList: '<ul><li><strong>表格提取：</strong>用 Unstructured 或 Docling 从 PDF 提取表格，转换为 markdown 或 JSON 后再分块。表格包含纯文本提取会遗漏的密集信息。</li><li><strong>图像理解：</strong>用 GPT-4o 或 Claude 生成图表、截图的文本描述。将这些描述与原始图像引用一起索引。</li><li><strong>结构化数据：</strong>为数据库和 API 生成 schema 和样本数据的自然语言摘要。需要实时数据库访问时用 text-to-SQL。</li><li><strong>代码仓库：</strong>分别索引函数、类和文档字符串。用代码专用嵌入模型（Voyage AI voyage-code-3）获得更好的语义匹配。</li></ul>',
    multimodalP2: '多模态 RAG 增加了复杂性但显著提升了覆盖率。从纯文本 RAG 开始，然后根据用户问了但找不到答案的内容添加模态。',
    h2_preprocessing: '文档预处理技巧',
    preprocessingP1: '输入文档的质量直接决定 RAG 质量。垃圾进，垃圾出。以下是预处理最佳实践：',
    preprocessingList: '<ul><li><strong>清理 HTML 残留：</strong>索引前剥离导航、页脚、广告和模板。用 readability 库或 Unstructured 提取正文。</li><li><strong>规范化格式：</strong>将所有文档转换为统一 markdown。跨来源统一标题、列表和代码块。</li><li><strong>去重：</strong>索引前移除重复或近似重复的文档。重复浪费存储并导致冗余检索结果。</li><li><strong>添加元数据：</strong>为每个文档添加标题、作者、日期、分类和来源 URL。元数据支持过滤并提升引用质量。</li><li><strong>处理 OCR 内容：</strong>扫描 PDF 需要 OCR。用 Tesseract 或云 OCR 服务。后处理 OCR 输出修复常见错误。</li><li><strong>验证编码：</strong>确保所有文本为 UTF-8。混合编码导致嵌入和检索中的静默损坏。</li></ul>',
    h2_checklist: '快速入门清单',
    checklistP1: '按此清单从零构建你的第一个 RAG 流水线：',
    checklistItems: '<ol><li><strong>确定知识来源</strong> — 识别包含用户所需答案的文档、数据库或 API。从 50-100 篇精选文档开始。</li><li><strong>选择技术栈</strong> — 推荐：Python + LangChain + OpenAI + ChromaDB。一小时内从零到可用原型。</li><li><strong>设置文档加载</strong> — 为文档类型选择合适的加载器。保留元数据（来源 URL、页码、章节标题）用于引用。</li><li><strong>调优分块</strong> — 从 RecursiveCharacterTextSplitter 开始，512 tokens，50 token 重叠。根据内容类型和检索准确率调整。</li><li><strong>生成和存储嵌入</strong> — 使用 text-embedding-3-small。本地存 ChromaDB 或云端用 Pinecone。</li><li><strong>构建检索链</strong> — 从简单相似度搜索（k=4）开始。如果看到重复结果，添加 MMR。</li><li><strong>编写提示模板</strong> — 指示 LLM 仅从上下文回答并引用来源。用 10 个代表性问题测试。</li><li><strong>用 RAGAS 评估</strong> — 创建 50+ 问题测试集并附标准答案。测量忠实度、相关性和召回率。</li><li><strong>迭代改进</strong> — 调整分块大小，尝试混合搜索，添加重排序。每次改动应提升 RAGAS 分数。</li><li><strong>部署</strong> — 添加流式传输、缓存、错误处理和监控。使用 LangSmith 等可观测性工具。</li></ol>',
    h2_streaming: '流式 RAG 响应',
    streamingP1: '用户期望实时响应。流式传输在 token 生成时即刻交付，而非等待完整响应。以下是 LangChain 实现流式传输的方法：',
    streamingP2: '流式传输将感知延迟从 3-5 秒降低到首 token 500ms 以内。面向用户的应用必须实现流式传输 — 对用户体验的提升是巨大的。',
    h2_faq: '常见问题',
    faq1_q: 'AI 中的 RAG 是什么，如何工作？',
    faq1_a: 'RAG（检索增强生成）是一种在查询时从知识库检索相关文档并注入提示的架构。LLM 基于检索到的上下文生成答案，而非仅依赖训练数据，从而减少幻觉并获取最新信息。',
    faq2_q: '何时用 RAG vs 微调？',
    faq2_a: '需要 LLM 基于特定文档、数据库或频繁更新的内容回答时用 RAG。需要改变模型行为、语气或教授专业推理模式时用微调。RAG 实施更快、维护更便宜、更擅长提供引用。大多数生产系统从 RAG 开始，仅在需要时添加微调。',
    faq3_q: 'RAG 最佳分块大小是多少？',
    faq3_a: '没有通用最佳分块大小。Q&A 系统用 256-512 tokens 加 50-100 token 重叠。摘要用 1024-2048 tokens。代码按函数或类边界分割。关键是测量：创建测试集，尝试不同大小，选择 RAGAS 指标最高的。',
    faq4_q: 'RAG 该用哪个向量数据库？',
    faq4_a: '原型用 ChromaDB 或 FAISS。生产 SaaS 选 Pinecone。已用 PostgreSQL 选 pgvector。高级混合搜索选 Weaviate 或 Qdrant。最好的向量数据库是适配你现有基础设施的那个。',
    faq5_q: '如何减少 RAG 中的幻觉？',
    faq5_a: '五个策略：(1) 用混合搜索和重排序提升检索质量。(2) 明确提示指令仅从上下文回答。(3) 添加引用 — 要求模型引用来源文档。(4) 上下文压缩去除不相关内容。(5) 用 RAGAS 衡量忠实度并迭代。',
    faq6_q: '2026 年 RAG 最佳嵌入模型是什么？',
    faq6_a: 'OpenAI text-embedding-3-small 是最佳通用选择。多语言用 Cohere embed-v3。私有/离线部署用 sentence-transformers 或 Ollama。代码搜索用 Voyage AI voyage-3。选择前务必在你的数据上做基准测试。',
    faq7_q: '如何评估 RAG 流水线质量？',
    faq7_a: '用 RAGAS 框架测量四个指标：忠实度、答案相关性、上下文精确度和上下文召回率。创建 50-100 个有标准答案的测试集，每次流水线改动后运行 RAGAS 评估。',
    faq8_q: 'RAG 中的混合搜索是什么，为什么更好？',
    faq8_a: '混合搜索结合稠密向量相似度搜索和稀疏关键词搜索（BM25）。稠密搜索捕获语义（同义词、改述），稀疏搜索捕获精确关键词（产品名、错误码）。两者结合优于单一方法。大多数现代向量存储原生支持混合搜索。',
    h2_frameworks: 'RAG 框架对比',
    frameworksP1: '多个框架简化了 RAG 开发，以下是主要选项对比：',
    frameworksTable: '<table><thead><tr><th>框架</th><th>语言</th><th>优势</th><th>劣势</th><th>适用场景</th></tr></thead><tbody><tr><td>LangChain</td><td>Python, JS</td><td>最大生态，最多集成，优秀文档</td><td>抽象层开销，频繁破坏性更新</td><td>通用 RAG，快速原型</td></tr><tr><td>LlamaIndex</td><td>Python</td><td>专为 RAG 设计，高级索引策略</td><td>学习曲线陡，社区较小</td><td>复杂文档索引</td></tr><tr><td>Haystack</td><td>Python</td><td>流水线优先设计，面向生产</td><td>自定义流程灵活性较差</td><td>企业级流水线</td></tr><tr><td>Semantic Kernel</td><td>C#, Python</td><td>微软生态，Azure 集成</td><td>较新，示例较少</td><td>.NET / Azure 团队</td></tr><tr><td>Vercel AI SDK</td><td>TypeScript</td><td>流式优先，React 集成</td><td>RAG 工具不够成熟</td><td>Next.js Web 应用</td></tr></tbody></table>',
    frameworksP2: '<strong>推荐：</strong>从 LangChain 开始，凭借其生态广度和文档质量。如果你的场景以文档为主且需要复杂索引，评估 LlamaIndex。TypeScript Web 应用推荐 Vercel AI SDK。',
    h2_usecases: 'RAG 真实应用场景',
    usecasesP1: 'RAG 不是理论概念 — 它支撑着数千个生产应用：',
    usecasesList: '<ul><li><strong>内部知识库问答：</strong>员工查询公司政策、HR 文档、工程手册。RAG 从 Confluence、Notion 或飞书检索并带引用回答。</li><li><strong>客服聊天机器人：</strong>AI 客服搜索产品文档、历史工单和 FAQ 解决客户问题，减少 40-60% 人工客服工作量。</li><li><strong>法律文档分析：</strong>律师查询数千份合同、法规和判例。RAG 找到相关条款并总结先例。</li><li><strong>代码助手：</strong>开发者查询代码库。RAG 搜索索引的源码、README 和架构文档提供上下文感知的答案。</li><li><strong>医学研究：</strong>研究人员查询论文、临床试验数据和药物相互作用数据库。RAG 呈现相关研究并提供引用。</li></ul>',
    h2_cost: '成本估算指南',
    costP1: '了解 RAG 成本有助于预算规划。以下是典型知识库（10,000 篇文档，平均 2,000 tokens）的成本分解：',
    costTable: '<table><thead><tr><th>组件</th><th>计算</th><th>月成本</th></tr></thead><tbody><tr><td>初始嵌入（一次性）</td><td>2000万 tokens x $0.02/百万</td><td>$0.40</td></tr><tr><td>向量存储（Pinecone）</td><td>~10万向量，免费层</td><td>$0</td></tr><tr><td>查询嵌入（1K查询/天）</td><td>3万查询 x 平均100 tokens</td><td>$0.06</td></tr><tr><td>LLM 生成（GPT-4o-mini）</td><td>3万查询 x 平均2K tokens</td><td>$9.00</td></tr><tr><td>LLM 生成（GPT-4o）</td><td>3万查询 x 平均2K tokens</td><td>$75.00</td></tr><tr><td>重排序（可选，自部署）</td><td>GPU 实例</td><td>$50-150</td></tr></tbody></table>',
    costP2: '<strong>关键洞察：</strong>嵌入成本可忽略不计。LLM 生成模型选择主导你的账单。80% 查询用 GPT-4o-mini，仅将复杂查询路由到 GPT-4o。这种"模型路由"策略可减少 60-70% 成本。',
    conclusion: '<strong>RAG 是构建需要有依据、准确、最新答案的 LLM 应用最实用、最有影响力的架构</strong>。从简单流水线开始（LangChain + OpenAI + ChromaDB），用 RAGAS 测量，然后迭代。需要更好检索时添加混合搜索和重排序。生态已成熟，工具已就绪 — 关键差异在于你如何针对自己的数据和用例调优分块、检索和提示。',
  },
};

const codeStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '16px',
  borderRadius: '8px',
  overflowX: 'auto',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '32px',
};

export default function RagGuide({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <div style={sectionStyle}>
        <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      </div>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px 20px', borderRadius: '4px', margin: '24px 0' }}>
        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: s.tldr }} />
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px 24px', borderRadius: '8px', margin: '24px 0' }}>
        <h3 style={{ marginTop: 0 }}>{s.takeaways_title}</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>{s.takeaway1}</li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
        </ul>
      </div>

      {/* What is RAG */}
      <div style={sectionStyle}>
        <h2>{s.h2_what}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.whatP1 }} />
        <p dangerouslySetInnerHTML={{ __html: s.whatP2 }} />
        <p dangerouslySetInnerHTML={{ __html: s.whatP3 }} />
      </div>

      {/* RAG vs Fine-tuning vs Prompt Engineering */}
      <div style={sectionStyle}>
        <h2>{s.h2_comparison}</h2>
        <p>{s.comparisonP}</p>
        <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: s.compTable }} />
        <p dangerouslySetInnerHTML={{ __html: s.compSummary }} />
      </div>

      {/* Architecture */}
      <div style={sectionStyle}>
        <h2>{s.h2_architecture}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.archP1 }} />
        <pre style={codeStyle}><code>{'RAG Architecture Overview\n' +
'========================\n\n' +
'INDEXING PIPELINE (Offline)\n' +
'--------------------------\n' +
'                                                         \n' +
'  [Documents]    [Text Splitter]    [Embedding]    [Vector Store]\n' +
'  PDF, HTML  -->  Chunk into    -->  Convert to -->  Store in\n' +
'  Markdown       256-512 tokens     dense vectors   Pinecone/\n' +
'  Database       with overlap       (1536-dim)      Qdrant/PG\n' +
'                                                         \n' +
'QUERY PIPELINE (Online)\n' +
'-----------------------\n' +
'                                                         \n' +
'  [User Query]   [Embed Query]   [Retrieve]   [Re-rank]   [Generate]\n' +
'  "How do I  --> Convert to  --> Top-k     --> Cross-   --> LLM with\n' +
'   deploy?"     query vector    similar      encoder      context\n' +
'                                chunks       scoring      + prompt\n' +
'                   |                            |            |\n' +
'                   v                            v            v\n' +
'              Same embedding              Filter &      Grounded\n' +
'              model as indexing           compress      answer with\n' +
'                                         context       citations'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.archP2 }} />
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '6px', margin: '16px 0' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            <strong>{lang === 'zh' ? '提示' : 'Note'}:</strong>{' '}
            {lang === 'zh'
              ? '索引流水线是一次性或定期批处理任务，可以在后台运行。查询流水线是延迟敏感的关键路径 — 这里每毫秒都重要。优化重点应放在查询流水线上。'
              : 'The indexing pipeline is a one-time or periodic batch job that can run in the background. The query pipeline is the latency-sensitive critical path — every millisecond counts here. Focus your optimization efforts on the query pipeline.'}
          </p>
        </div>
      </div>

      {/* Document Loading */}
      <div style={sectionStyle}>
        <h2>{s.h2_loading}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.loadingP1 }} />
        <pre style={codeStyle}><code>{'from langchain_community.document_loaders import (\n' +
'    PyPDFLoader,\n' +
'    UnstructuredHTMLLoader,\n' +
'    UnstructuredMarkdownLoader,\n' +
'    TextLoader,\n' +
'    CSVLoader,\n' +
'    DirectoryLoader,\n' +
'    WebBaseLoader,\n' +
')\n\n' +
'# Load a single PDF\n' +
'pdf_docs = PyPDFLoader("report.pdf").load()\n\n' +
'# Load all markdown files from a directory\n' +
'md_docs = DirectoryLoader(\n' +
'    "./docs/", glob="**/*.md",\n' +
'    loader_cls=UnstructuredMarkdownLoader\n' +
').load()\n\n' +
'# Load a web page\n' +
'web_docs = WebBaseLoader("https://docs.example.com/api").load()\n\n' +
'# Load CSV data\n' +
'csv_docs = CSVLoader("products.csv").load()\n\n' +
'print(f"Loaded {len(pdf_docs)} pages from PDF")\n' +
'print(f"First doc metadata: {pdf_docs[0].metadata}")'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.loadingP2 }} />
      </div>

      {/* Text Splitting */}
      <div style={sectionStyle}>
        <h2>{s.h2_splitting}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.splittingP1 }} />
        <p>{s.splittingP2}</p>
        <div dangerouslySetInnerHTML={{ __html: s.splittingStrategies }} />
        <pre style={codeStyle}><code>{'from langchain.text_splitter import (\n' +
'    RecursiveCharacterTextSplitter,\n' +
'    MarkdownHeaderTextSplitter,\n' +
')\n\n' +
'# Default: RecursiveCharacterTextSplitter\n' +
'text_splitter = RecursiveCharacterTextSplitter(\n' +
'    chunk_size=512,\n' +
'    chunk_overlap=50,\n' +
'    length_function=len,\n' +
'    separators=["\\n\\n", "\\n", ". ", " ", ""]\n' +
')\n' +
'chunks = text_splitter.split_documents(pdf_docs)\n' +
'print(f"Split into {len(chunks)} chunks")\n\n' +
'# Markdown-aware splitting\n' +
'md_splitter = MarkdownHeaderTextSplitter(\n' +
'    headers_to_split_on=[\n' +
'        ("#", "h1"),\n' +
'        ("##", "h2"),\n' +
'        ("###", "h3"),\n' +
'    ]\n' +
')\n' +
'md_chunks = md_splitter.split_text(md_content)'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.splittingGuidelines }} />
      </div>

      {/* Embedding Models */}
      <div style={sectionStyle}>
        <h2>{s.h2_embedding}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.embeddingP1 }} />
        <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: s.embeddingTable }} />
        <pre style={codeStyle}><code>{'from langchain_openai import OpenAIEmbeddings\n\n' +
'# OpenAI embeddings (recommended for most cases)\n' +
'embeddings = OpenAIEmbeddings(\n' +
'    model="text-embedding-3-small",\n' +
'    # dimensions=512  # optional: reduce dimensions for cost savings\n' +
')\n\n' +
'# Embed a single query\n' +
'query_vector = embeddings.embed_query("How to deploy a RAG app?")\n' +
'print(f"Vector dimensions: {len(query_vector)}")  # 1536\n\n' +
'# Embed multiple documents (batched automatically)\n' +
'doc_vectors = embeddings.embed_documents(\n' +
'    [chunk.page_content for chunk in chunks]\n' +
')'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.embeddingP2 }} />
      </div>

      {/* Vector Stores */}
      <div style={sectionStyle}>
        <h2>{s.h2_vectorstores}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.vectorP1 }} />
        <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: s.vectorTable }} />
        <pre style={codeStyle}><code>{'from langchain_chroma import Chroma\n' +
'from langchain_openai import OpenAIEmbeddings\n\n' +
'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")\n\n' +
'# Create and persist a vector store\n' +
'vectorstore = Chroma.from_documents(\n' +
'    documents=chunks,\n' +
'    embedding=embeddings,\n' +
'    persist_directory="./chroma_db",\n' +
'    collection_name="my_docs"\n' +
')\n\n' +
'# Load an existing vector store\n' +
'vectorstore = Chroma(\n' +
'    persist_directory="./chroma_db",\n' +
'    embedding_function=embeddings,\n' +
'    collection_name="my_docs"\n' +
')\n\n' +
'# Basic similarity search\n' +
'results = vectorstore.similarity_search("deployment guide", k=4)\n' +
'for doc in results:\n' +
'    print(doc.page_content[:100])'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.vectorP2 }} />
      </div>

      {/* Retrieval Strategies */}
      <div style={sectionStyle}>
        <h2>{s.h2_retrieval}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.retrievalP1 }} />
        <div dangerouslySetInnerHTML={{ __html: s.retrievalStrategies }} />
        <p dangerouslySetInnerHTML={{ __html: s.retrievalP2 }} />
      </div>

      {/* Generation */}
      <div style={sectionStyle}>
        <h2>{s.h2_generation}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.generationP1 }} />
        <pre style={codeStyle}><code>{'from langchain_openai import ChatOpenAI\n' +
'from langchain_core.prompts import ChatPromptTemplate\n' +
'from langchain_core.output_parsers import StrOutputParser\n' +
'from langchain_core.runnables import RunnablePassthrough\n\n' +
'llm = ChatOpenAI(model="gpt-4o", temperature=0)\n\n' +
'prompt = ChatPromptTemplate.from_template(\n' +
'    """Answer the question based ONLY on the following context.\n' +
'If the context does not contain the answer, say "I don\'t have \n' +
'enough information to answer this question."\n\n' +
'Context:\n' +
'{context}\n\n' +
'Question: {question}\n\n' +
'Answer (cite sources):"""\n' +
')\n\n' +
'# Build the RAG chain\n' +
'retriever = vectorstore.as_retriever(search_kwargs={"k": 4})\n\n' +
'def format_docs(docs):\n' +
'    return "\\n\\n".join(\n' +
'        f"[Source: {d.metadata.get(\'source\', \'unknown\')}]\\n"\n' +
'        + d.page_content for d in docs\n' +
'    )\n\n' +
'rag_chain = (\n' +
'    {"context": retriever | format_docs,\n' +
'     "question": RunnablePassthrough()}\n' +
'    | prompt\n' +
'    | llm\n' +
'    | StrOutputParser()\n' +
')\n\n' +
'answer = rag_chain.invoke("How do I deploy to production?")\n' +
'print(answer)'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.generationP2 }} />
      </div>

      {/* Advanced RAG */}
      <div style={sectionStyle}>
        <h2>{s.h2_advanced}</h2>
        <p>{s.advancedP1}</p>
        <p dangerouslySetInnerHTML={{ __html: s.advHyde }} />
        <p dangerouslySetInnerHTML={{ __html: s.advParent }} />
        <p dangerouslySetInnerHTML={{ __html: s.advMultiQuery }} />
        <p dangerouslySetInnerHTML={{ __html: s.advCompression }} />
        <p dangerouslySetInnerHTML={{ __html: s.advRouting }} />
      </div>

      {/* Complete Code Example */}
      <div style={sectionStyle}>
        <h2>{s.h2_code}</h2>
        <p>{s.codeP1}</p>
        <pre style={codeStyle}><code>{'# Complete RAG pipeline: pip install langchain langchain-openai\n' +
'# pip install langchain-chroma unstructured pypdf\n\n' +
'import os\n' +
'os.environ["OPENAI_API_KEY"] = "sk-..."\n\n' +
'from langchain_community.document_loaders import PyPDFLoader\n' +
'from langchain.text_splitter import RecursiveCharacterTextSplitter\n' +
'from langchain_openai import OpenAIEmbeddings, ChatOpenAI\n' +
'from langchain_chroma import Chroma\n' +
'from langchain_core.prompts import ChatPromptTemplate\n' +
'from langchain_core.output_parsers import StrOutputParser\n' +
'from langchain_core.runnables import RunnablePassthrough\n\n' +
'# 1. Load documents\n' +
'docs = PyPDFLoader("knowledge_base.pdf").load()\n\n' +
'# 2. Split into chunks\n' +
'splitter = RecursiveCharacterTextSplitter(\n' +
'    chunk_size=512, chunk_overlap=50\n' +
')\n' +
'chunks = splitter.split_documents(docs)\n\n' +
'# 3. Create vector store with embeddings\n' +
'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")\n' +
'vectorstore = Chroma.from_documents(\n' +
'    chunks, embeddings, persist_directory="./db"\n' +
')\n\n' +
'# 4. Build RAG chain\n' +
'retriever = vectorstore.as_retriever(search_kwargs={"k": 4})\n' +
'llm = ChatOpenAI(model="gpt-4o", temperature=0)\n' +
'prompt = ChatPromptTemplate.from_template(\n' +
'    "Answer based ONLY on this context:\\n{context}\\n\\n"\n' +
'    "Question: {question}\\nAnswer:"\n' +
')\n\n' +
'rag_chain = (\n' +
'    {"context": retriever | (lambda docs: "\\n".join(\n' +
'        d.page_content for d in docs)),\n' +
'     "question": RunnablePassthrough()}\n' +
'    | prompt | llm | StrOutputParser()\n' +
')\n\n' +
'# 5. Query\n' +
'print(rag_chain.invoke("What is the deployment process?"))'}</code></pre>
        <p>{s.codeP2}</p>
      </div>

      {/* Advanced: Hybrid Search with Re-ranking */}
      <div style={sectionStyle}>
        <h2>{s.h2_advanced_code}</h2>
        <p>{s.advCodeP1}</p>
        <pre style={codeStyle}><code>{'# pip install rank-bm25 sentence-transformers\n\n' +
'from rank_bm25 import BM25Okapi\n' +
'from sentence_transformers import CrossEncoder\n' +
'import numpy as np\n\n' +
'# BM25 sparse retriever\n' +
'corpus = [doc.page_content for doc in chunks]\n' +
'tokenized = [doc.split() for doc in corpus]\n' +
'bm25 = BM25Okapi(tokenized)\n\n' +
'def hybrid_search(query, k=10):\n' +
'    # Dense search via vector store\n' +
'    dense_results = vectorstore.similarity_search(query, k=k)\n' +
'    \n' +
'    # Sparse search via BM25\n' +
'    bm25_scores = bm25.get_scores(query.split())\n' +
'    top_bm25_idx = np.argsort(bm25_scores)[-k:][::-1]\n' +
'    sparse_results = [chunks[i] for i in top_bm25_idx]\n' +
'    \n' +
'    # Merge and deduplicate\n' +
'    seen = set()\n' +
'    merged = []\n' +
'    for doc in dense_results + sparse_results:\n' +
'        if doc.page_content not in seen:\n' +
'            seen.add(doc.page_content)\n' +
'            merged.append(doc)\n' +
'    return merged[:k]\n\n' +
'# Cross-encoder re-ranking\n' +
'reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")\n\n' +
'def rerank(query, docs, top_k=4):\n' +
'    pairs = [[query, d.page_content] for d in docs]\n' +
'    scores = reranker.predict(pairs)\n' +
'    ranked = sorted(zip(scores, docs), reverse=True)\n' +
'    return [doc for _, doc in ranked[:top_k]]\n\n' +
'# Usage: hybrid search + re-rank\n' +
'candidates = hybrid_search("How to handle auth?", k=10)\n' +
'final_docs = rerank("How to handle auth?", candidates, top_k=4)'}</code></pre>
      </div>

      {/* Evaluation */}
      <div style={sectionStyle}>
        <h2>{s.h2_evaluation}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.evalP1 }} />
        <div dangerouslySetInnerHTML={{ __html: s.evalMetrics }} />
        <pre style={codeStyle}><code>{'# pip install ragas\n\n' +
'from ragas import evaluate\n' +
'from ragas.metrics import (\n' +
'    faithfulness,\n' +
'    answer_relevancy,\n' +
'    context_precision,\n' +
'    context_recall,\n' +
')\n' +
'from datasets import Dataset\n\n' +
'# Prepare evaluation dataset\n' +
'eval_data = {\n' +
'    "question": [\n' +
'        "How do I deploy to production?",\n' +
'        "What authentication methods are supported?",\n' +
'    ],\n' +
'    "answer": [  # generated by your RAG pipeline\n' +
'        rag_chain.invoke("How do I deploy to production?"),\n' +
'        rag_chain.invoke("What auth methods are supported?"),\n' +
'    ],\n' +
'    "contexts": [  # retrieved chunks for each question\n' +
'        [d.page_content for d in retriever.invoke(\n' +
'            "How do I deploy to production?")],\n' +
'        [d.page_content for d in retriever.invoke(\n' +
'            "What auth methods are supported?")],\n' +
'    ],\n' +
'    "ground_truth": [  # human-written correct answers\n' +
'        "Deploy using Docker with the provided Dockerfile...",\n' +
'        "OAuth 2.0, API keys, and JWT are supported...",\n' +
'    ],\n' +
'}\n\n' +
'dataset = Dataset.from_dict(eval_data)\n' +
'results = evaluate(\n' +
'    dataset,\n' +
'    metrics=[faithfulness, answer_relevancy,\n' +
'             context_precision, context_recall],\n' +
')\n' +
'print(results)\n' +
'# {faithfulness: 0.92, answer_relevancy: 0.89,\n' +
'#  context_precision: 0.85, context_recall: 0.78}'}</code></pre>
        <p dangerouslySetInnerHTML={{ __html: s.evalP2 }} />
      </div>

      {/* Production Considerations */}
      <div style={sectionStyle}>
        <h2>{s.h2_production}</h2>
        <p>{s.prodP1}</p>
        <p dangerouslySetInnerHTML={{ __html: s.prodCaching }} />
        <p dangerouslySetInnerHTML={{ __html: s.prodStreaming }} />
        <p dangerouslySetInnerHTML={{ __html: s.prodCost }} />
        <p dangerouslySetInnerHTML={{ __html: s.prodMonitoring }} />
        <p dangerouslySetInnerHTML={{ __html: s.prodSecurity }} />
      </div>

      {/* Common Pitfalls */}
      <div style={sectionStyle}>
        <h2>{s.h2_pitfalls}</h2>
        <p>{s.pitfallsP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.pitfalls }} />
      </div>

      {/* Frameworks Comparison */}
      <div style={sectionStyle}>
        <h2>{s.h2_frameworks}</h2>
        <p>{s.frameworksP1}</p>
        <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: s.frameworksTable }} />
        <p dangerouslySetInnerHTML={{ __html: s.frameworksP2 }} />
      </div>

      {/* Real-World Use Cases */}
      <div style={sectionStyle}>
        <h2>{s.h2_usecases}</h2>
        <p>{s.usecasesP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.usecasesList }} />
      </div>

      {/* Cost Estimation */}
      <div style={sectionStyle}>
        <h2>{s.h2_cost}</h2>
        <p>{s.costP1}</p>
        <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: s.costTable }} />
        <p dangerouslySetInnerHTML={{ __html: s.costP2 }} />
      </div>

      {/* Monitoring */}
      <div style={sectionStyle}>
        <h2>{s.h2_monitoring}</h2>
        <p>{s.monitoringP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.monitoringList }} />
        <p>{s.monitoringP2}</p>
      </div>

      {/* pgvector Production Setup */}
      <div style={sectionStyle}>
        <h2>{s.h2_pgvector}</h2>
        <p>{s.pgvectorP1}</p>
        <pre style={codeStyle}><code>{'-- Enable the extension\n' +
'CREATE EXTENSION IF NOT EXISTS vector;\n\n' +
'-- Create a table for document chunks\n' +
'CREATE TABLE documents (\n' +
'    id SERIAL PRIMARY KEY,\n' +
'    content TEXT NOT NULL,\n' +
'    metadata JSONB DEFAULT \'{}\',\n' +
'    embedding vector(1536),  -- matches text-embedding-3-small\n' +
'    created_at TIMESTAMP DEFAULT NOW()\n' +
');\n\n' +
'-- Create an HNSW index for fast similarity search\n' +
'CREATE INDEX ON documents\n' +
'    USING hnsw (embedding vector_cosine_ops)\n' +
'    WITH (m = 16, ef_construction = 64);\n\n' +
'-- Similarity search query\n' +
'SELECT id, content, metadata,\n' +
'    1 - (embedding <=> $1::vector) AS similarity\n' +
'FROM documents\n' +
'WHERE 1 - (embedding <=> $1::vector) > 0.7\n' +
'ORDER BY embedding <=> $1::vector\n' +
'LIMIT 5;'}</code></pre>
        <pre style={codeStyle}><code>{'# Python: LangChain + pgvector\n' +
'# pip install langchain-postgres psycopg2-binary\n\n' +
'from langchain_postgres import PGVector\n' +
'from langchain_openai import OpenAIEmbeddings\n\n' +
'CONNECTION = "postgresql://user:pass@localhost:5432/mydb"\n\n' +
'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")\n\n' +
'vectorstore = PGVector.from_documents(\n' +
'    documents=chunks,\n' +
'    embedding=embeddings,\n' +
'    connection=CONNECTION,\n' +
'    collection_name="my_docs",\n' +
')\n\n' +
'# Query with metadata filtering\n' +
'results = vectorstore.similarity_search(\n' +
'    "deployment guide",\n' +
'    k=4,\n' +
'    filter={"source": "docs/deploy.md"}\n' +
')'}</code></pre>
        <p>{s.pgvectorP2}</p>
      </div>

      {/* Agentic RAG */}
      <div style={sectionStyle}>
        <h2>{s.h2_agentic}</h2>
        <p dangerouslySetInnerHTML={{ __html: s.agenticP1 }} />
        <p>{s.agenticP2}</p>
        <p>{s.agenticP3}</p>
      </div>

      {/* Multi-Modal RAG */}
      <div style={sectionStyle}>
        <h2>{s.h2_multimodal}</h2>
        <p>{s.multimodalP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.multimodalList }} />
        <p>{s.multimodalP2}</p>
      </div>

      {/* Document Preprocessing */}
      <div style={sectionStyle}>
        <h2>{s.h2_preprocessing}</h2>
        <p>{s.preprocessingP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.preprocessingList }} />
      </div>

      {/* Getting Started Checklist */}
      <div style={sectionStyle}>
        <h2>{s.h2_checklist}</h2>
        <p>{s.checklistP1}</p>
        <div dangerouslySetInnerHTML={{ __html: s.checklistItems }} />
      </div>

      {/* Streaming RAG */}
      <div style={sectionStyle}>
        <h2>{s.h2_streaming}</h2>
        <p>{s.streamingP1}</p>
        <pre style={codeStyle}><code>{'import asyncio\n' +
'from langchain_openai import ChatOpenAI\n' +
'from langchain_core.prompts import ChatPromptTemplate\n' +
'from langchain_core.output_parsers import StrOutputParser\n' +
'from langchain_core.runnables import RunnablePassthrough\n\n' +
'llm = ChatOpenAI(model="gpt-4o", temperature=0, streaming=True)\n\n' +
'prompt = ChatPromptTemplate.from_template(\n' +
'    "Answer based ONLY on this context:\\n{context}\\n\\n"\n' +
'    "Question: {question}\\nAnswer:"\n' +
')\n\n' +
'retriever = vectorstore.as_retriever(search_kwargs={"k": 4})\n\n' +
'rag_chain = (\n' +
'    {"context": retriever | (lambda docs: "\\n".join(\n' +
'        d.page_content for d in docs)),\n' +
'     "question": RunnablePassthrough()}\n' +
'    | prompt | llm | StrOutputParser()\n' +
')\n\n' +
'# Synchronous streaming\n' +
'for chunk in rag_chain.stream("How do I set up auth?"):\n' +
'    print(chunk, end="", flush=True)\n\n' +
'# Async streaming (for web frameworks)\n' +
'async def stream_response(question: str):\n' +
'    async for chunk in rag_chain.astream(question):\n' +
'        yield chunk  # Send to client via SSE or WebSocket\n\n' +
'# FastAPI example\n' +
'from fastapi import FastAPI\n' +
'from fastapi.responses import StreamingResponse\n\n' +
'app = FastAPI()\n\n' +
'@app.get("/ask")\n' +
'async def ask(q: str):\n' +
'    return StreamingResponse(\n' +
'        stream_response(q),\n' +
'        media_type="text/event-stream"\n' +
'    )'}</code></pre>
        <p>{s.streamingP2}</p>
      </div>

      {/* FAQ */}
      <div style={sectionStyle}>
        <h2>{s.h2_faq}</h2>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <h3>{s[`faq${i}_q` as keyof typeof s]}</h3>
            <p>{s[`faq${i}_a` as keyof typeof s]}</p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div style={sectionStyle}>
        <p dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      </div>
    </>
  );
}
