'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Python Data Science Complete Guide — NumPy, Pandas, Matplotlib, Scikit-learn, Jupyter',
    description:
      'Master Python for data science with this comprehensive guide covering NumPy arrays, Pandas DataFrames, data visualization with Matplotlib and Seaborn, machine learning with Scikit-learn, Jupyter notebooks, and a full real-world ML pipeline from EDA to FastAPI deployment.',
    tldr:
      'Python dominates data science in 2026. The core stack — NumPy for arrays, Pandas for tabular data, Matplotlib/Seaborn for visualization, and Scikit-learn for machine learning — runs on every major cloud and integrates with Jupyter notebooks for interactive analysis. For production, wrap your model in FastAPI and track experiments with MLflow.',
  },
  zh: {
    title: 'Python 数据科学完整指南 — NumPy、Pandas、Matplotlib、Scikit-learn、Jupyter',
    description:
      '通过本综合指南掌握 Python 数据科学，涵盖 NumPy 数组、Pandas DataFrame、Matplotlib 和 Seaborn 数据可视化、Scikit-learn 机器学习、Jupyter Notebook，以及从 EDA 到 FastAPI 部署的完整真实世界 ML 流水线。',
    tldr:
      'Python 在 2026 年主导数据科学领域。核心技术栈——NumPy 处理数组、Pandas 处理表格数据、Matplotlib/Seaborn 用于可视化、Scikit-learn 用于机器学习——可在所有主流云平台运行，并与 Jupyter Notebook 集成用于交互式分析。在生产环境中，可用 FastAPI 封装模型并用 MLflow 追踪实验。',
  },
};

export default function PythonDataScienceGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I use Pandas or Polars for data processing in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Polars is significantly faster than Pandas for large datasets (often 5-50x) because it is written in Rust and uses lazy evaluation with query optimization. However, Pandas still has a larger ecosystem, more tutorials, and better integration with older libraries. Use Pandas when you value ecosystem compatibility and dataset fits in memory comfortably. Switch to Polars when processing datasets over 1 GB, when you need better multi-core utilization, or when Pandas performance becomes a bottleneck. Both APIs are now stable and production-ready.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I accelerate NumPy and Pandas with GPU?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NVIDIA RAPIDS provides GPU-accelerated equivalents: cupy replaces NumPy and cudf replaces Pandas. Simply install rapids via conda and change import numpy as np to import cupy as cp and import pandas as pd to import cudf as pd — most APIs are identical. For machine learning, cuml mirrors Scikit-learn. On non-NVIDIA hardware, JAX with XLA compilation provides GPU/TPU acceleration for array operations and neural networks. Google Colab and Kaggle notebooks offer free GPU access for experimentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is MLflow and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MLflow is an open-source platform for managing the full ML lifecycle: experiment tracking (log parameters, metrics, artifacts), model registry (version control for trained models), and model serving. It integrates with Scikit-learn, TensorFlow, PyTorch, and XGBoost. Use it to compare experiments, reproduce results, and deploy models. A typical workflow: mlflow.set_experiment("my-project"), then mlflow.sklearn.autolog() automatically records all Scikit-learn training runs. You can self-host MLflow or use Databricks Managed MLflow.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best Python library for interactive data visualization?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plotly is the most popular choice for interactive charts — it renders in Jupyter notebooks, Dash applications, and web browsers with zoom, hover tooltips, and download capabilities. Bokeh is another strong option for streaming data and custom widgets. For publication-quality static charts, Matplotlib and Seaborn remain standard. Altair uses a declarative grammar-of-graphics approach ideal for quick exploratory plots. In 2026, Plotly Express (the high-level Plotly API) is recommended for most interactive visualization needs due to its concise syntax.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle missing data in Pandas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pandas represents missing values as NaN (float) or pd.NA (nullable integer/string types). Key methods: df.isna() detects missing values, df.dropna() removes rows/columns with NaN, df.fillna(value) fills with a constant, df.fillna(df.mean()) fills with column means, and df.interpolate() uses linear interpolation for time series. For machine learning, Scikit-learn\'s SimpleImputer handles missing data as part of a Pipeline. Always analyze the pattern of missingness (MCAR, MAR, MNAR) before choosing a strategy — dropping is rarely optimal for large missing fractions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between fit(), transform(), and fit_transform() in Scikit-learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'fit() computes statistics from training data (e.g., mean and std for StandardScaler). transform() applies the learned transformation to data. fit_transform() does both in one step. The critical rule: call fit() only on training data, then use transform() on both training and test data. If you fit on all data including the test set, you create data leakage — the model indirectly "sees" test statistics during training, leading to overly optimistic evaluation metrics. Use Pipeline to enforce this automatically: pipe.fit(X_train, y_train) then pipe.score(X_test, y_test).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I deploy a Scikit-learn model to production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most common production approach is: (1) Save the trained model with joblib.dump(model, "model.pkl"), (2) Wrap it in a FastAPI endpoint that loads the model once at startup and exposes a POST route for predictions, (3) Containerize with Docker, (4) Deploy to a cloud provider (AWS, GCP, Azure) or a managed ML platform. For larger organizations, MLflow Model Registry provides versioned model storage with staging/production environments. Bentoml and Ray Serve are specialized ML serving frameworks with batching and autoscaling built in.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Jupyter Notebook or VS Code better for data science?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both are excellent and many data scientists use them together. Jupyter Notebooks (via JupyterLab or classic Notebook) excel at interactive exploration, sharing results with rich output (plots, tables), and step-by-step analysis. VS Code with the Jupyter extension gives you the same notebook interface plus full IDE features: debugger, Git integration, IntelliSense, and refactoring tools. For long-running training jobs and production-quality code, VS Code is generally preferred. For exploratory analysis and sharing with non-engineers, notebooks are better. In 2026, Marimo is an emerging reactive notebook alternative worth exploring.',
        },
      },
    ],
  };

  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.7, color: '#1e293b', maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', margin: '2rem 0', boxShadow: '0 1px 4px rgba(14,165,233,0.08)' }}>
        <p style={{ margin: 0, fontWeight: 700, color: '#0369a1', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem 1.5rem', margin: '2rem 0' }}>
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700, color: '#334155', fontSize: '1rem' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569' }}>
          <li style={{ marginBottom: '0.4rem' }}>NumPy ndarray is the foundation of all scientific computing in Python — master broadcasting and vectorization to avoid slow Python loops.</li>
          <li style={{ marginBottom: '0.4rem' }}>Pandas DataFrame is the standard for tabular data; learn <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>groupby</code>, <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>merge</code>, and <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>pivot_table</code> for real-world analysis.</li>
          <li style={{ marginBottom: '0.4rem' }}>Always split train/test before any preprocessing to prevent data leakage; use Scikit-learn Pipelines to enforce this.</li>
          <li style={{ marginBottom: '0.4rem' }}>Matplotlib is the backbone of Python visualization; Seaborn adds statistical plots; Plotly adds interactivity.</li>
          <li style={{ marginBottom: '0.4rem' }}>A production ML pipeline goes: EDA → feature engineering → model training → evaluation → FastAPI serving → MLflow tracking.</li>
          <li style={{ marginBottom: '0.4rem' }}>Python beats R, Julia, and MATLAB for ecosystem breadth, deployment, and community support in 2026.</li>
          <li style={{ marginBottom: '0.4rem' }}>Polars is a faster Pandas alternative for large datasets; RAPIDS provides GPU acceleration for NumPy/Pandas workflows.</li>
          <li>Jupyter notebooks excel at exploration and sharing; VS Code combines notebook interactivity with full IDE power.</li>
        </ul>
      </div>

      {/* Section 1: Python Data Science Stack Overview */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>1. Python Data Science Stack Overview</h2>

      <p>Python became the dominant language for data science because it combines a gentle learning curve with an unmatched library ecosystem. Unlike specialized tools such as R or MATLAB, Python is a general-purpose language — the same code that cleans your dataset can serve a REST API, scrape websites, or orchestrate cloud jobs. This versatility means data science skills transfer directly to production engineering.</p>

      <p>The modern Python data science stack layers cleanly on top of each other:</p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: '#1e40af', color: '#fff' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Library</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Purpose</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Key Objects</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Install</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['NumPy', 'N-dimensional array operations, linear algebra', 'ndarray', 'pip install numpy'],
              ['Pandas', 'Tabular data manipulation and analysis', 'Series, DataFrame', 'pip install pandas'],
              ['Matplotlib', 'Static 2D/3D plotting (the base layer)', 'Figure, Axes', 'pip install matplotlib'],
              ['Seaborn', 'Statistical data visualization on top of Matplotlib', 'FacetGrid, PairGrid', 'pip install seaborn'],
              ['Plotly', 'Interactive charts for browser/notebooks', 'Figure, go.Scatter', 'pip install plotly'],
              ['Scikit-learn', 'ML algorithms, preprocessing, pipelines', 'Pipeline, BaseEstimator', 'pip install scikit-learn'],
              ['Jupyter', 'Interactive notebook environment', 'Notebook, JupyterLab', 'pip install jupyterlab'],
              ['SciPy', 'Scientific algorithms (stats, optimization, signal)', 'sparse, linalg', 'pip install scipy'],
            ].map(([lib, purpose, key, install], i) => (
              <tr key={lib} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#1e40af' }}>{lib}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#374151' }}>{purpose}</td>
                <td style={{ padding: '0.65rem 1rem' }}><code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.85em' }}>{key}</code></td>
                <td style={{ padding: '0.65rem 1rem' }}><code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.85em' }}>{install}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>Install the full stack in one shot:</p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# Create a dedicated environment (recommended)\nconda create -n ds python=3.12\nconda activate ds\n\n# Install via conda-forge (binary wheels, no compilation)\nconda install -c conda-forge numpy pandas matplotlib seaborn plotly scikit-learn jupyterlab scipy\n\n# Or install via pip\npip install numpy pandas matplotlib seaborn plotly scikit-learn jupyterlab scipy\n\n# Verify versions\npython -c "import numpy as np; import pandas as pd; print(np.__version__, pd.__version__)"'
        }</code>
      </pre>

      <p>The Anaconda distribution bundles most of these libraries and is recommended for beginners. For reproducible team environments, use <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>conda env export &gt; environment.yml</code> or pin versions in <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>requirements.txt</code>.</p>

      {/* Section 2: NumPy Arrays */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>2. NumPy Arrays — The Foundation of Scientific Python</h2>

      <p>NumPy's <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>ndarray</code> is a fixed-type, contiguous-memory array that enables vectorized operations 10–100x faster than Python lists. Every major data science library — Pandas, Scikit-learn, TensorFlow, PyTorch — stores data as NumPy arrays or compatible memory buffers.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Creating Arrays</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import numpy as np\n\n# From Python list\na = np.array([1, 2, 3, 4, 5])             # dtype=int64\nb = np.array([1.0, 2.0, 3.0])             # dtype=float64\n\n# Built-in constructors\nzeros = np.zeros((3, 4))                   # 3x4 of 0.0\nones  = np.ones((2, 3), dtype=np.int32)   # 2x3 of 1 (int)\neye   = np.eye(4)                          # 4x4 identity matrix\nrange_arr = np.arange(0, 10, 2)           # [0, 2, 4, 6, 8]\nlinear = np.linspace(0, 1, 5)             # [0.0, 0.25, 0.5, 0.75, 1.0]\n\n# Random arrays (fixed seed for reproducibility)\nrng = np.random.default_rng(seed=42)      # preferred new API\nrand_float = rng.random((3, 3))           # uniform [0, 1)\nrand_normal = rng.normal(loc=0, scale=1, size=(100, 5))\nrand_int    = rng.integers(0, 100, size=10)\n\n# Shape and dtype\nprint(rand_normal.shape)    # (100, 5)\nprint(rand_normal.dtype)    # float64\nprint(rand_normal.ndim)     # 2\nprint(rand_normal.size)     # 500  (total elements)'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Vectorized Operations and Broadcasting</h3>

      <p>Vectorized operations apply element-wise without explicit Python loops. Broadcasting automatically extends arrays of different shapes so they can operate together:</p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'a = np.array([1, 2, 3, 4, 5])\n\n# Element-wise arithmetic (no loop needed)\nprint(a * 2)          # [2, 4, 6, 8, 10]\nprint(a ** 2)         # [1, 4, 9, 16, 25]\nprint(np.sqrt(a))     # [1.0, 1.414, 1.732, 2.0, 2.236]\n\n# Broadcasting: (5,) and (5,1) produce (5,5)\ncol = a.reshape(-1, 1)   # shape (5,1)\nresult = a + col          # shape (5,5) — outer sum\nprint(result)\n# [[2 3 4 5 6]\n#  [3 4 5 6 7]\n#  [4 5 6 7 8]\n#  [5 6 7 8 9]\n#  [6 7 8 9 10]]\n\n# Aggregation along axes\nmatrix = np.array([[1,2,3],[4,5,6],[7,8,9]])\nprint(matrix.sum(axis=0))   # [12, 15, 18]  — column sums\nprint(matrix.sum(axis=1))   # [6, 15, 24]   — row sums\nprint(matrix.mean())        # 5.0 — global mean\n\n# Boolean indexing\ndata = rng.normal(0, 1, 1000)\npositives = data[data > 0]         # all positive values\noutliers  = data[np.abs(data) > 2] # values beyond 2 sigma\nprint(f"Outlier count: {len(outliers)}")'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reshape and Advanced Indexing</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'arr = np.arange(24)\n\n# Reshape without copying data\nmatrix = arr.reshape(4, 6)        # shape (4, 6)\ncube   = arr.reshape(2, 3, 4)    # shape (2, 3, 4)\nflat   = cube.ravel()            # back to 1D (view when possible)\n\n# Slicing: [rows, cols]\nprint(matrix[1:3, 2:5])          # rows 1-2, cols 2-4\nprint(matrix[:, -1])             # last column\nprint(cube[0, :, :])             # first "layer" of 3D array\n\n# Fancy indexing\nrows = np.array([0, 2])\ncols = np.array([1, 4])\nprint(matrix[rows, cols])        # elements (0,1) and (2,4)\n\n# np.where — vectorized if-else\nresult = np.where(matrix > 12, matrix, -1)  # keep if >12, else -1\n\n# Stacking and splitting\na = np.ones((3, 4))\nb = np.zeros((3, 4))\nv_stack = np.vstack([a, b])      # shape (6, 4)\nh_stack = np.hstack([a, b])      # shape (3, 8)\nparts   = np.hsplit(h_stack, 2)  # split into two (3, 4) arrays'
        }</code>
      </pre>

      {/* Section 3: Pandas DataFrames */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>3. Pandas DataFrames — Tabular Data Mastery</h2>

      <p>Pandas introduces two core data structures: <strong>Series</strong> (a labeled 1D array) and <strong>DataFrame</strong> (a labeled 2D table). DataFrames are the workhorse of data science — reading CSVs, filtering records, joining tables, computing aggregates, and preparing features for machine learning all happen through the Pandas API.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Loading and Inspecting Data</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import pandas as pd\n\n# Reading data\ndf = pd.read_csv("data.csv")                         # CSV\ndf = pd.read_csv("data.csv", parse_dates=["date"])   # parse dates\ndf = pd.read_parquet("data.parquet")                 # Parquet (faster)\ndf = pd.read_excel("report.xlsx", sheet_name="Q1")  # Excel\ndf = pd.read_json("records.json", orient="records")  # JSON\n\n# Quick inspection\nprint(df.shape)           # (rows, columns)\nprint(df.dtypes)          # column data types\nprint(df.head(5))         # first 5 rows\nprint(df.tail(3))         # last 3 rows\nprint(df.info())          # non-null counts + dtypes\nprint(df.describe())      # count, mean, std, quartiles\nprint(df.isnull().sum())  # missing values per column\nprint(df.nunique())       # unique values per column\n\n# Selecting columns\nage_series = df["age"]               # Series\nsubset = df[["name", "age", "city"]] # DataFrame with 3 columns\n\n# Row selection\nrow0 = df.iloc[0]                    # first row by position\nrow_a = df.loc[df.index[0]]         # first row by label\nfiltered = df[df["age"] > 30]       # boolean filter'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Filtering, Sorting, and Transforming</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# Filtering with multiple conditions\nhigh_earners = df[(df["salary"] > 80000) & (df["city"] == "NYC")]\nyoung_or_senior = df[(df["age"] < 25) | (df["age"] > 60)]\nnot_na = df[df["email"].notna()]\n\n# query() string syntax (more readable for complex filters)\nresult = df.query("salary > 80000 and city == @target_city", target_city="NYC")\n\n# Sorting\ndf_sorted = df.sort_values("salary", ascending=False)\ndf_multi  = df.sort_values(["city", "salary"], ascending=[True, False])\n\n# Adding / modifying columns\ndf["annual_bonus"] = df["salary"] * 0.10\ndf["full_name"]    = df["first_name"] + " " + df["last_name"]\ndf["age_group"]    = pd.cut(df["age"], bins=[0,25,40,60,100],\n                            labels=["young","mid","senior","elder"])\n\n# apply() for custom logic\ndf["score_grade"] = df["score"].apply(lambda x: "A" if x >= 90 else ("B" if x >= 80 else "C"))\n\n# assign() for chaining (returns new DataFrame)\ndf2 = (\n    df\n    .assign(salary_k=lambda d: d["salary"] / 1000)\n    .assign(tax=lambda d: d["salary_k"] * 0.3)\n    .query("salary_k > 50")\n    .sort_values("tax", ascending=False)\n    .reset_index(drop=True)\n)'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>GroupBy and Aggregation</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# Basic groupby\ngrouped = df.groupby("department")["salary"]\nprint(grouped.mean())   # average salary per department\nprint(grouped.agg(["mean","median","std","count"]))\n\n# Multiple columns\ndf.groupby(["department","level"])["salary"].mean().unstack()\n\n# Custom aggregation\nagg_result = df.groupby("city").agg(\n    avg_salary   = ("salary",  "mean"),\n    median_age   = ("age",     "median"),\n    total_people = ("name",    "count"),\n    min_exp      = ("experience", "min"),\n)\nprint(agg_result)\n\n# pivot_table — spreadsheet-style summaries\npivot = df.pivot_table(\n    values="revenue",\n    index="product",\n    columns="quarter",\n    aggfunc="sum",\n    fill_value=0\n)\n\n# Merge / join DataFrames\norders   = pd.read_csv("orders.csv")\ncustomers = pd.read_csv("customers.csv")\n\njoined = orders.merge(customers, on="customer_id", how="left")\ncombined = pd.concat([df_2023, df_2024], ignore_index=True)\n\n# Wide → Long and Long → Wide\nlong = df.melt(id_vars=["id","name"], var_name="metric", value_name="value")\nwide = long.pivot(index="id", columns="metric", values="value")'
        }</code>
      </pre>

      {/* Section 4: Data Visualization */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>4. Data Visualization — Matplotlib, Seaborn, and Plotly</h2>

      <p>Effective visualization communicates insights that tables cannot. Python offers three complementary visualization layers: Matplotlib for fine-grained control, Seaborn for statistical plots with beautiful defaults, and Plotly for interactive charts that work in notebooks and the browser.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Matplotlib Fundamentals</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import matplotlib.pyplot as plt\nimport numpy as np\n\n# The object-oriented API (preferred for complex plots)\nfig, axes = plt.subplots(2, 2, figsize=(12, 8))\n\n# Line plot\nx = np.linspace(0, 10, 200)\naxes[0, 0].plot(x, np.sin(x), color="#1e40af", linewidth=2, label="sin(x)")\naxes[0, 0].plot(x, np.cos(x), color="#dc2626", linestyle="--", label="cos(x)")\naxes[0, 0].set_title("Trigonometric Functions")\naxes[0, 0].legend()\naxes[0, 0].grid(alpha=0.3)\n\n# Histogram\ndata = np.random.normal(50, 15, 1000)\naxes[0, 1].hist(data, bins=30, color="#6366f1", edgecolor="white", alpha=0.8)\naxes[0, 1].set_title("Distribution")\naxes[0, 1].set_xlabel("Value")\naxes[0, 1].set_ylabel("Frequency")\n\n# Scatter plot\naxes[1, 0].scatter(df["experience"], df["salary"],\n                   c=df["age"], cmap="viridis", alpha=0.6, s=40)\naxes[1, 0].set_title("Experience vs Salary")\n\n# Bar chart\ncategories = ["A", "B", "C", "D"]\nvalues     = [23, 45, 12, 67]\nbars = axes[1, 1].bar(categories, values, color=["#0ea5e9","#10b981","#f59e0b","#ef4444"])\naxes[1, 1].bar_label(bars, fmt="%.0f")\naxes[1, 1].set_title("Category Comparison")\n\nplt.tight_layout()\nplt.savefig("overview.png", dpi=150, bbox_inches="tight")\nplt.show()'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Seaborn Statistical Plots</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_theme(style="whitegrid", palette="husl")\n\n# Load sample dataset\ntips = sns.load_dataset("tips")\niris = sns.load_dataset("iris")\n\n# Distribution plot with KDE\nfig, axes = plt.subplots(1, 3, figsize=(15, 5))\n\nsns.histplot(tips["total_bill"], kde=True, ax=axes[0], color="#6366f1")\naxes[0].set_title("Total Bill Distribution")\n\n# Box plot — compare distributions by category\nsns.boxplot(x="day", y="total_bill", hue="sex", data=tips, ax=axes[1])\naxes[1].set_title("Bill by Day and Gender")\n\n# Violin plot — shows distribution shape\nsns.violinplot(x="day", y="tip", data=tips, ax=axes[2])\naxes[2].set_title("Tip Distribution by Day")\n\nplt.tight_layout(); plt.show()\n\n# Heatmap — correlation matrix\ncorr = iris.drop("species", axis=1).corr()\nsns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm",\n            vmin=-1, vmax=1, center=0)\nplt.title("Feature Correlations")\nplt.show()\n\n# Pairplot — all feature combinations\nsns.pairplot(iris, hue="species", diag_kind="kde")\nplt.show()'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Plotly Interactive Charts</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import plotly.express as px\nimport plotly.graph_objects as go\n\n# Plotly Express — high-level API\nfig = px.scatter(\n    df, x="experience", y="salary",\n    color="department", size="age",\n    hover_data=["name", "city"],\n    title="Salary vs Experience",\n    template="plotly_white"\n)\nfig.update_traces(marker=dict(opacity=0.7))\nfig.show()  # opens in browser or renders in notebook\n\n# Interactive histogram\nfig2 = px.histogram(df, x="salary", nbins=40, color="department",\n                    barmode="overlay", opacity=0.7)\nfig2.show()\n\n# Choropleth map\nfig3 = px.choropleth(\n    gapminder, locations="iso_alpha", color="gdpPercap",\n    hover_name="country", animation_frame="year",\n    color_continuous_scale="Viridis"\n)\nfig3.show()\n\n# Low-level go API for custom charts\nfig4 = go.Figure()\nfig4.add_trace(go.Candlestick(\n    x=prices["date"], open=prices["open"],\n    high=prices["high"],  low=prices["low"],\n    close=prices["close"], name="OHLC"\n))\nfig4.update_layout(title="Stock Price", xaxis_rangeslider_visible=False)\nfig4.show()\n\n# Export to static image or HTML\nfig.write_html("chart.html")           # shareable HTML with JS\nfig.write_image("chart.png", scale=2)  # needs kaleido package'
        }</code>
      </pre>

      {/* Section 5: Data Cleaning */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>5. Data Cleaning — Handling NaN, Duplicates, and Type Conversion</h2>

      <p>Data scientists spend 60–80% of their time cleaning data. Messy real-world datasets contain missing values, duplicate rows, inconsistent formats, erroneous entries, and wrong data types. Systematic cleaning is essential before any analysis or modeling.</p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("raw_data.csv")\n\n# ── 1. Inspect Missing Values ───────────────────────────────────\nprint(df.isnull().sum())                  # count per column\nprint(df.isnull().mean() * 100)           # percentage missing\n\n# Visualize with heatmap\nimport seaborn as sns\nsns.heatmap(df.isnull(), cbar=False, yticklabels=False)\n\n# ── 2. Handle Missing Values ─────────────────────────────────────\ndf.dropna(subset=["critical_column"])             # drop rows where key column is NA\ndf["salary"].fillna(df["salary"].median())        # fill with median\ndf["category"].fillna("Unknown")                  # fill categorical with placeholder\ndf["measurement"].fillna(method="ffill")          # forward-fill time series\n\n# Multiple strategies at once\ndf = df.fillna({\n    "age":       df["age"].median(),\n    "city":      "Unknown",\n    "salary":    df.groupby("department")["salary"].transform("mean"),\n})\n\n# ── 3. Remove Duplicates ─────────────────────────────────────────\nprint(df.duplicated().sum())                      # count duplicate rows\ndf = df.drop_duplicates()                         # drop exact duplicates\ndf = df.drop_duplicates(subset=["email"])         # deduplicate by email\ndf = df.drop_duplicates(subset=["email"], keep="last")  # keep most recent\n\n# ── 4. Fix Data Types ───────────────────────────────────────────\ndf["hire_date"]   = pd.to_datetime(df["hire_date"], format="%Y-%m-%d")\ndf["salary"]      = pd.to_numeric(df["salary"], errors="coerce")  # NaN for bad values\ndf["employee_id"] = df["employee_id"].astype(str)\ndf["score"]       = df["score"].astype("float32")   # save memory\ndf["dept_code"]   = df["dept_code"].astype("category")  # memory efficient\n\n# ── 5. String Normalization ──────────────────────────────────────\ndf["city"]  = df["city"].str.strip().str.lower().str.replace(r"\\s+", " ", regex=True)\ndf["email"] = df["email"].str.lower().str.strip()\ndf["phone"] = df["phone"].str.replace(r"[^\\d]", "", regex=True)  # digits only\n\n# Standardize categorical values\ncity_map = {"new york": "New York", "ny": "New York", "nyc": "New York"}\ndf["city"] = df["city"].map(city_map).fillna(df["city"])\n\n# ── 6. Outlier Detection and Treatment ──────────────────────────\nQ1, Q3 = df["salary"].quantile([0.25, 0.75])\nIQR = Q3 - Q1\nlower, upper = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR\ndf_clean = df[df["salary"].between(lower, upper)]  # remove outliers\ndf["salary"] = df["salary"].clip(lower, upper)      # or clip them\n\n# Z-score method\nfrom scipy import stats\nz_scores = np.abs(stats.zscore(df[["salary","age"]].dropna()))\ndf_no_outliers = df[(z_scores < 3).all(axis=1)]'
        }</code>
      </pre>

      {/* Section 6: Scikit-learn */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>6. Machine Learning with Scikit-learn</h2>

      <p>Scikit-learn provides a consistent <code style={{ background: '#e2e8f0', padding: '0.1em 0.4em', borderRadius: '3px', fontSize: '0.9em' }}>fit/transform/predict</code> API across dozens of algorithms. Its <strong>Pipeline</strong> class chains preprocessing and modeling into a single object, preventing data leakage and enabling clean cross-validation.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Train-Test Split and Preprocessing</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score\nfrom sklearn.preprocessing  import StandardScaler, MinMaxScaler, LabelEncoder, OneHotEncoder\nfrom sklearn.impute          import SimpleImputer\nfrom sklearn.compose         import ColumnTransformer\nfrom sklearn.pipeline        import Pipeline\nimport pandas as pd\n\n# Load data\ndf = pd.read_csv("titanic.csv")\nX = df.drop("survived", axis=1)\ny = df["survived"]\n\n# Train/test split — ALWAYS before any fitting\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# Identify column types\nnumeric_cols  = X.select_dtypes(include=["int64","float64"]).columns.tolist()\ncategoric_cols = X.select_dtypes(include=["object","category"]).columns.tolist()\n\n# Build preprocessing pipelines per column type\nnumeric_pipe = Pipeline([\n    ("impute", SimpleImputer(strategy="median")),\n    ("scale",  StandardScaler()),\n])\n\ncategoric_pipe = Pipeline([\n    ("impute", SimpleImputer(strategy="constant", fill_value="missing")),\n    ("encode", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),\n])\n\n# Combine with ColumnTransformer\npreprocessor = ColumnTransformer([\n    ("num", numeric_pipe,  numeric_cols),\n    ("cat", categoric_pipe, categoric_cols),\n])\n\nprint(f"Training on {X_train.shape[0]} samples")\nprint(f"Testing on  {X_test.shape[0]} samples")'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Training and Evaluating Models</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'from sklearn.ensemble    import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.svm         import SVC\nfrom sklearn.metrics     import (\n    classification_report, confusion_matrix,\n    roc_auc_score, roc_curve, ConfusionMatrixDisplay\n)\nfrom sklearn.model_selection import GridSearchCV\nimport matplotlib.pyplot as plt\n\n# Full pipeline: preprocessing + model\npipeline = Pipeline([\n    ("prep",  preprocessor),\n    ("model", RandomForestClassifier(n_estimators=200, random_state=42))\n])\n\n# Train\npipeline.fit(X_train, y_train)\n\n# Evaluate\ny_pred = pipeline.predict(X_test)\ny_proba = pipeline.predict_proba(X_test)[:, 1]\n\nprint(classification_report(y_test, y_pred))\nprint(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.4f}")\n\n# Confusion matrix\nfig, ax = plt.subplots(figsize=(6,5))\nConfusionMatrixDisplay.from_estimator(pipeline, X_test, y_test, ax=ax)\nplt.title("Confusion Matrix")\nplt.tight_layout()\n\n# Cross-validation (more robust estimate)\ncv_scores = cross_val_score(pipeline, X, y, cv=5, scoring="roc_auc")\nprint(f"CV ROC-AUC: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")\n\n# Hyperparameter tuning with GridSearchCV\nparam_grid = {\n    "model__n_estimators": [100, 200, 300],\n    "model__max_depth":    [None, 10, 20],\n    "model__min_samples_split": [2, 5],\n}\n\ngrid_search = GridSearchCV(\n    pipeline, param_grid,\n    cv=5, scoring="roc_auc", n_jobs=-1, verbose=1\n)\ngrid_search.fit(X_train, y_train)\nprint(f"Best params: {grid_search.best_params_}")\nprint(f"Best CV score: {grid_search.best_score_:.4f}")\n\n# Save model\nimport joblib\njoblib.dump(grid_search.best_estimator_, "model.pkl")\nloaded = joblib.load("model.pkl")'
        }</code>
      </pre>

      {/* Section 7: Jupyter Notebooks and VS Code */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>7. Jupyter Notebooks and VS Code for Data Science</h2>

      <p>The notebook environment revolutionized data science by interleaving code, narrative text, math equations, and rich output (plots, tables) in a single document. In 2026, JupyterLab and VS Code's Jupyter extension are the two dominant environments.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Essential Jupyter Magic Commands</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# ── Line magics (prefix single line) ───────────────────────────\n%time  my_function()         # time a single statement\n%timeit my_function()        # average over multiple runs\n%run   analysis.py           # run external Python script in kernel\n%matplotlib inline           # render Matplotlib plots inline\n%matplotlib widget           # interactive plots with pan/zoom\n%load  data_loader.py        # paste contents of file into cell\n%who                         # list all variables in namespace\n%whos                        # detailed variable info (type, size)\n%history                     # show command history\n%lsmagic                     # list all available magic commands\n\n# ── Cell magics (prefix entire cell) ──────────────────────────\n%%time                        # time entire cell\n%%timeit                      # benchmark entire cell\n%%bash                        # run cell as shell script\n%%writefile config.py         # write cell contents to file\n%%capture output              # capture stdout/stderr\n%%html                        # render cell as HTML\n\n# ── Debugging ──────────────────────────────────────────────────\n%debug                        # drop into debugger after exception\n%pdb on                       # auto-enter debugger on any exception\n\n# ── Profile performance ────────────────────────────────────────\n%prun my_slow_function()      # line-by-line profiling\n%lprun -f my_function my_function()  # needs line_profiler'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Notebook Best Practices</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# ── 1. Restart and Run All before sharing ──────────────────────\n# Kernel → Restart & Run All ensures reproducibility\n# Hidden state from deleted cells causes silent bugs\n\n# ── 2. Use Papermill for parameterized notebooks ────────────────\n# pip install papermill\nimport papermill as pm\npm.execute_notebook(\n    "template.ipynb",\n    "output_2024_Q4.ipynb",\n    parameters={"year": 2024, "quarter": "Q4"}\n)\n\n# ── 3. Display formatting helpers ───────────────────────────────\nfrom IPython.display import display, HTML, Markdown\ndisplay(df.head().style.highlight_max(color="lightgreen"))  # styled DataFrame\ndisplay(HTML("<b>Custom HTML in notebook</b>"))\ndisplay(Markdown("## Heading in Markdown cell via code"))\n\n# ── 4. Pandas display options ────────────────────────────────────\npd.set_option("display.max_columns", 50)\npd.set_option("display.max_rows", 100)\npd.set_option("display.float_format", "{:.4f}".format)\npd.set_option("display.width", 120)\n\n# ── 5. nbconvert — export to HTML / PDF / slides ─────────────────\n# jupyter nbconvert --to html analysis.ipynb\n# jupyter nbconvert --to slides analysis.ipynb --post serve\n\n# ── 6. nbformat — programmatic notebook creation ─────────────────\nimport nbformat\nnb = nbformat.v4.new_notebook()\ncells = [\n    nbformat.v4.new_markdown_cell("# Auto-Generated Notebook"),\n    nbformat.v4.new_code_cell("import pandas as pd\\nprint(pd.__version__)"),\n]\nnb.cells = cells\nwith open("generated.ipynb", "w") as f:\n    nbformat.write(nb, f)'
        }</code>
      </pre>

      {/* Section 8: Comparison Table */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>8. Python vs R vs Julia vs MATLAB — Data Science Language Comparison</h2>

      <p>Choosing the right language depends on your team's background, production requirements, and the specific domain. Here is a definitive 2026 comparison across the most important dimensions:</p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#f8fafc' }}>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, minWidth: '160px' }}>Criterion</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, background: '#1e40af' }}>Python</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600 }}>R</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600 }}>Julia</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600 }}>MATLAB</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Learning Curve', 'Gentle — general-purpose syntax', 'Moderate — data-first idioms', 'Steep — type system, macros', 'Moderate — proprietary syntax'],
              ['ML Ecosystem', 'Excellent (Sklearn, PyTorch, TF)', 'Good (caret, tidymodels)', 'Growing (Flux.jl, MLJ.jl)', 'Limited (Statistics Toolbox)'],
              ['Statistical Analysis', 'Good (scipy, statsmodels)', 'Excellent — built for stats', 'Good (HypothesisTests.jl)', 'Good (Statistics Toolbox)'],
              ['Data Visualization', 'Excellent (Matplotlib, Plotly)', 'Excellent (ggplot2, Shiny)', 'Good (Plots.jl, Makie.jl)', 'Good (built-in)'],
              ['Raw Performance', 'Good with NumPy/Cython', 'Slow (R is interpreted)', 'Excellent — near C speed', 'Good (JIT in some ops)'],
              ['Deep Learning', 'Best (PyTorch, TensorFlow, JAX)', 'Limited (torch via reticulate)', 'Growing (Flux.jl)', 'Limited (Deep Learning Toolbox)'],
              ['Big Data / Cloud', 'Excellent (PySpark, Dask, Ray)', 'Limited (sparklyr)', 'Emerging', 'Poor'],
              ['Production Deployment', 'Excellent (FastAPI, Flask)', 'Limited (Plumber, Shiny)', 'Growing (Genie.jl)', 'Poor (MCR required)'],
              ['Cost', 'Free (open source)', 'Free (open source)', 'Free (open source)', 'Expensive ($$$)'],
              ['Community Size', 'Largest globally', 'Large in academia/biostat', 'Small but growing', 'Shrinking'],
              ['Job Market Demand', 'Highest — by far', 'High in academia/pharma', 'Niche (HPC, finance)', 'Declining'],
              ['Best For', 'General DS, ML, production', 'Statistics, academia, bioinfo', 'Scientific computing, HPC', 'Engineering, signal processing'],
            ].map(([criterion, python, r, julia, matlab], i) => (
              <tr key={criterion} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#374151' }}>{criterion}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#1e40af', background: i % 2 === 0 ? '#eff6ff' : '#dbeafe', fontWeight: 500 }}>{python}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#374151' }}>{r}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#374151' }}>{julia}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#374151' }}>{matlab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px', padding: '1rem 1.25rem', margin: '1.5rem 0' }}>
        <p style={{ margin: 0, color: '#713f12', fontSize: '0.95rem' }}>
          <strong>Verdict 2026:</strong> Python is the clear winner for most data science work, especially when production deployment matters. Choose R when your team is statistician-heavy or the project is purely academic/biostatistical. Choose Julia only if you need C-level numeric performance in scientific computing. Avoid MATLAB for new projects due to cost and declining community.
        </p>
      </div>

      {/* Section 9: Real-World Pipeline */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>9. Real-World Pipeline: EDA → Feature Engineering → Model → FastAPI Deployment</h2>

      <p>A production data science project has five stages: exploratory data analysis (EDA), feature engineering, model training, evaluation, and deployment. Here is a complete end-to-end example for a customer churn prediction model.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Stage 1: Exploratory Data Analysis</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf = pd.read_csv("churn_data.csv")\n\n# Target distribution\nprint(df["churned"].value_counts(normalize=True))\n# churned\n# 0    0.855  (85.5% retained)\n# 1    0.145  (14.5% churned)\n\n# Numeric feature summary\ndf.describe().T.sort_values("std", ascending=False)\n\n# Correlation with target\nnumeric_df = df.select_dtypes(include="number")\ncorr_with_target = numeric_df.corr()["churned"].sort_values(key=abs, ascending=False)\nprint(corr_with_target.head(10))\n\n# Plot distributions split by target\nfig, axes = plt.subplots(2, 3, figsize=(15, 8))\nfor ax, col in zip(axes.flat, ["tenure","monthly_charges","total_charges","num_products","support_calls","age"]):\n    sns.histplot(df, x=col, hue="churned", kde=True, stat="density",\n                 common_norm=False, ax=ax, palette={0:"#6366f1",1:"#ef4444"})\nplt.tight_layout()\nplt.savefig("eda_distributions.png", dpi=120)'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Stage 2: Feature Engineering</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import numpy as np\n\n# Domain-driven features\ndf["charge_per_month"]     = df["total_charges"] / (df["tenure"] + 1)\ndf["products_per_month"]   = df["num_products"]  / (df["tenure"] + 1)\ndf["support_rate"]         = df["support_calls"] / (df["tenure"] + 1)\ndf["contract_is_monthly"]  = (df["contract_type"] == "Month-to-month").astype(int)\ndf["tenure_bucket"]        = pd.cut(df["tenure"], bins=[0,6,12,24,60,120],\n                                    labels=["0-6m","6-12m","1-2y","2-5y","5y+"])\n\n# Log-transform skewed features\nfor col in ["total_charges","monthly_charges"]:\n    df[f"log_{col}"] = np.log1p(df[col].clip(lower=0))\n\n# Interaction feature\ndf["high_spend_short_tenure"] = ((df["monthly_charges"] > 80) & (df["tenure"] < 12)).astype(int)\n\n# One-hot encode categoricals\ndf = pd.get_dummies(df, columns=["contract_type","payment_method","tenure_bucket"],\n                    drop_first=True, dtype=int)\n\n# Define final feature set\nFEATURES = [c for c in df.columns if c not in ["churned","customer_id"]]\nX = df[FEATURES]\ny = df["churned"]'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Stage 3: Model Training with MLflow Tracking</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import GradientBoostingClassifier\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import roc_auc_score, f1_score\nimport mlflow\nimport mlflow.sklearn\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\nmlflow.set_experiment("churn-prediction")\n\nwith mlflow.start_run(run_name="GBM-v1"):\n    # Log parameters\n    params = {"n_estimators": 300, "learning_rate": 0.05, "max_depth": 5, "subsample": 0.8}\n    mlflow.log_params(params)\n    \n    # Build and train pipeline\n    pipe = Pipeline([\n        ("scaler", StandardScaler()),\n        ("model",  GradientBoostingClassifier(**params, random_state=42))\n    ])\n    pipe.fit(X_train, y_train)\n    \n    # Evaluate\n    y_pred  = pipe.predict(X_test)\n    y_proba = pipe.predict_proba(X_test)[:, 1]\n    auc = roc_auc_score(y_test, y_proba)\n    f1  = f1_score(y_test, y_pred)\n    \n    # Log metrics\n    mlflow.log_metric("roc_auc", auc)\n    mlflow.log_metric("f1_score", f1)\n    \n    # Log model artifact\n    mlflow.sklearn.log_model(pipe, "churn_model")\n    \n    print(f"ROC-AUC: {auc:.4f}  F1: {f1:.4f}")\n\n# Feature importance\nimport pandas as pd\nimportances = pd.Series(\n    pipe.named_steps["model"].feature_importances_,\n    index=FEATURES\n).sort_values(ascending=False)\nprint(importances.head(15))'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Stage 4: FastAPI Deployment</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# main.py — FastAPI serving for the churn model\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nimport joblib\nimport pandas as pd\nimport numpy as np\nfrom typing import Optional\n\n# Load model once at startup\napp = FastAPI(title="Churn Prediction API", version="1.0.0")\nmodel = joblib.load("churn_model.pkl")\n\n# Request schema\nclass CustomerFeatures(BaseModel):\n    tenure: float\n    monthly_charges: float\n    total_charges: float\n    num_products: int\n    support_calls: int\n    contract_type: str\n    payment_method: str\n    age: Optional[float] = None\n\n# Response schema\nclass PredictionResponse(BaseModel):\n    customer_id: str\n    churn_probability: float\n    churn_predicted: bool\n    risk_tier: str\n\n@app.post("/predict", response_model=PredictionResponse)\ndef predict_churn(customer_id: str, features: CustomerFeatures):\n    try:\n        # Convert to DataFrame\n        data = pd.DataFrame([features.dict()])\n        \n        # Feature engineering (must mirror training)\n        data["charge_per_month"]   = data["total_charges"] / (data["tenure"] + 1)\n        data["support_rate"]       = data["support_calls"]  / (data["tenure"] + 1)\n        data["log_total_charges"]  = np.log1p(data["total_charges"].clip(lower=0))\n        data["log_monthly_charges"]= np.log1p(data["monthly_charges"].clip(lower=0))\n        data["contract_is_monthly"]= (data["contract_type"] == "Month-to-month").astype(int)\n        \n        # Predict\n        proba = float(model.predict_proba(data)[0, 1])\n        risk  = "high" if proba > 0.6 else ("medium" if proba > 0.3 else "low")\n        \n        return PredictionResponse(\n            customer_id=customer_id,\n            churn_probability=round(proba, 4),\n            churn_predicted=proba > 0.5,\n            risk_tier=risk\n        )\n    except Exception as e:\n        raise HTTPException(status_code=500, detail=str(e))\n\n@app.get("/health")\ndef health_check():\n    return {"status": "healthy", "model_loaded": model is not None}\n\n# Run with: uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Dockerizing the API</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'# Dockerfile\nFROM python:3.12-slim\n\nWORKDIR /app\n\n# Install dependencies first (cached layer)\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy application\nCOPY churn_model.pkl .\nCOPY main.py .\n\n# Expose and run\nEXPOSE 8000\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]\n\n# requirements.txt\n# fastapi==0.111.0\n# uvicorn[standard]==0.30.1\n# scikit-learn==1.5.0\n# pandas==2.2.2\n# numpy==1.26.4\n# joblib==1.4.2\n# pydantic==2.7.1\n\n# Build and run\n# docker build -t churn-api .\n# docker run -p 8000:8000 churn-api\n\n# Test with curl\n# curl -X POST http://localhost:8000/predict?customer_id=C123 \\\n#   -H "Content-Type: application/json" \\\n#   -d \'{"tenure":12,"monthly_charges":85,"total_charges":1020,\\\n#        "num_products":2,"support_calls":5,"contract_type":"Month-to-month",\\\n#        "payment_method":"Electronic check"}\''
        }</code>
      </pre>

      {/* Section 10: Advanced Topics */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>10. Advanced Topics — Polars, GPU Acceleration, and Distributed Computing</h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Polars — The Faster Pandas Alternative</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import polars as pl\n\n# Polars uses lazy evaluation — build a plan, then execute\nresult = (\n    pl.scan_csv("large_file.csv")        # lazy — no data loaded yet\n    .filter(pl.col("salary") > 50000)\n    .groupby("department")\n    .agg([\n        pl.col("salary").mean().alias("avg_salary"),\n        pl.col("name").count().alias("headcount"),\n    ])\n    .sort("avg_salary", descending=True)\n    .collect()                            # execute the optimized query\n)\n\nprint(result)\n\n# Eager API (like Pandas)\ndf = pl.read_csv("data.csv")\ndf2 = df.with_columns([\n    (pl.col("salary") * 1.1).alias("new_salary"),\n    pl.col("name").str.to_uppercase().alias("name_upper"),\n])\n\n# Polars is much faster for large DataFrames:\n# Pandas:  100M rows groupby = ~45s\n# Polars:  100M rows groupby = ~3s (using all cores)'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Dask — Distributed Pandas on Large Datasets</h3>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.88rem', lineHeight: 1.6, margin: '1rem 0' }}>
        <code>{
'import dask.dataframe as dd\n\n# Reads only metadata, lazy evaluation\nddf = dd.read_csv("large_folder/*.csv")\n\n# Pandas-compatible API\nresult = (\n    ddf[ddf["salary"] > 50000]\n    .groupby("department")["salary"]\n    .mean()\n    .compute()   # trigger parallel execution\n)\n\n# Scale to a cluster\nfrom dask.distributed import Client\nclient = Client("scheduler-address:8786")\n# Now .compute() runs distributed across workers\n\n# PySpark for truly massive data (Hadoop ecosystem)\nfrom pyspark.sql import SparkSession\nfrom pyspark.sql import functions as F\n\nspark = SparkSession.builder.appName("ChurnAnalysis").getOrCreate()\ndf_spark = spark.read.csv("hdfs://data/churn.csv", header=True, inferSchema=True)\nresult = df_spark.groupBy("department").agg(F.avg("salary").alias("avg_salary"))\nresult.show()'
        }</code>
      </pre>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Frequently Asked Questions</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {[
          {
            q: 'Should I use Pandas or Polars for data processing in 2026?',
            a: 'Polars is significantly faster than Pandas for large datasets (often 5-50x) due to its Rust foundation and lazy evaluation with query optimization. Use Pandas when ecosystem compatibility matters most. Switch to Polars when processing datasets over 1 GB or when you need better multi-core utilization. Both are production-ready.',
          },
          {
            q: 'How do I accelerate NumPy and Pandas with GPU?',
            a: 'NVIDIA RAPIDS provides GPU-accelerated equivalents: CuPy replaces NumPy and cuDF replaces Pandas with nearly identical APIs. Install via conda from the rapids channel and change your import statements. For non-NVIDIA hardware, JAX with XLA compilation provides GPU/TPU acceleration for array operations.',
          },
          {
            q: 'What is MLflow and why should I use it?',
            a: 'MLflow is an open-source platform for managing the full ML lifecycle: experiment tracking (log parameters, metrics, artifacts), model registry (version control for trained models), and model serving. Call mlflow.sklearn.autolog() before training to automatically log all Scikit-learn experiments.',
          },
          {
            q: 'What is the best Python library for interactive data visualization?',
            a: 'Plotly is the most popular choice for interactive charts — it renders in Jupyter notebooks and browsers with zoom, hover tooltips, and download capabilities. For publication-quality static charts, Matplotlib and Seaborn remain standard. Altair uses a declarative grammar-of-graphics approach for quick exploratory plots.',
          },
          {
            q: 'How do I handle missing data in Pandas?',
            a: 'Pandas represents missing values as NaN. Key methods: df.isna() detects them, df.dropna() removes affected rows, df.fillna(value) fills with a constant, and df.interpolate() uses linear interpolation for time series. For ML, use Scikit-learn\'s SimpleImputer as part of a Pipeline to handle this automatically and safely during cross-validation.',
          },
          {
            q: 'What is the difference between fit(), transform(), and fit_transform() in Scikit-learn?',
            a: 'fit() computes statistics from training data (e.g., mean and std for StandardScaler). transform() applies the learned transformation to any data. fit_transform() does both at once. Critical rule: call fit() only on training data, then transform() on both training and test data to prevent data leakage.',
          },
          {
            q: 'How do I deploy a Scikit-learn model to production?',
            a: 'Save the trained model with joblib.dump(model, "model.pkl"), then wrap it in a FastAPI endpoint that loads the model once at startup and exposes a POST route for predictions. Containerize with Docker and deploy to any cloud. MLflow Model Registry provides versioned model storage with staging/production environments.',
          },
          {
            q: 'Is Jupyter Notebook or VS Code better for data science?',
            a: 'Both are excellent and many data scientists use them together. Jupyter excels at interactive exploration and sharing results with rich output. VS Code with the Jupyter extension gives the same notebook interface plus full IDE features: debugger, Git integration, IntelliSense, and refactoring tools. Use VS Code for production-quality code; use notebooks for exploration and collaboration.',
          },
        ].map(({ q, a }) => (
          <div key={q} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', background: '#fff' }}>
            <h3 style={{ margin: '0 0 0.6rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{q}</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}
      </div>

      {/* Related Tools */}
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1.25rem 1.5rem', margin: '2.5rem 0 1rem' }}>
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700, color: '#15803d', fontSize: '1rem' }}>Related DevToolBox Tools</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { href: '/tools/json-to-python', label: 'JSON to Python Dataclass' },
            { href: '/tools/csv-json', label: 'CSV ↔ JSON Converter' },
            { href: '/tools/hash-generator', label: 'Hash Generator' },
            { href: '/tools/base64-encoder', label: 'Base64 Encoder/Decoder' },
            { href: '/tools/regex-tester', label: 'Regex Tester' },
            { href: '/tools/json-formatter', label: 'JSON Formatter' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={`/${lang}${href}`}
              style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500, border: '1px solid #86efac' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem 1.5rem', margin: '2rem 0' }}>
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700, color: '#334155', fontSize: '1rem' }}>Summary</p>
        <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>
          Python's data science ecosystem is unmatched in breadth, depth, and production-readiness. The stack — NumPy for arrays, Pandas for tabular data, Matplotlib/Seaborn/Plotly for visualization, and Scikit-learn for machine learning — covers 95% of data science tasks. For large-scale workloads, Polars and Dask extend this stack without sacrificing the Python-native experience. Combine Jupyter notebooks for exploration with VS Code for production code, track every experiment with MLflow, and deploy with FastAPI and Docker for a fully professional data science workflow in 2026.
        </p>
      </div>
    </article>
  );
}
