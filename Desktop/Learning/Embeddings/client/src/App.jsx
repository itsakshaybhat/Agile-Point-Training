import { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const suggestionChips = [
    { label: 'Delay function execution', query: 'Delay running a function until the user stops triggering it' },
    { label: 'Deep clone object', query: 'Make a full copy of a nested object or array' },
    { label: 'Rate-limit mousemove / scroll', query: 'Limit how many times a function can run per time window' },
    { label: 'Check object equality', query: 'Check if two objects or arrays have the same values' }
  ]

  const handleSearch = async (queryToSearch) => {
    const query = queryToSearch || searchQuery
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch search results from server')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      console.error(err)
      setError(err.message || 'An error occurred while fetching results.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (query) => {
    setSearchQuery(query)
    handleSearch(query)
  }

  const copyToClipboard = (text, title) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`Copied ${title} code to clipboard!`)
      setTimeout(() => {
        setToastMessage(null)
      }, 3000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <>
      <header>
        <div className="logo-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          AI Semantic Search
        </div>
        <h1>Embeddings Code Search</h1>
        <p>
          Ask questions in plain English (e.g., "how to delay execution") and find the most semantically relevant code snippets.
        </p>
      </header>

      <main>
        <div className="search-container">
          <div className="search-box-wrapper">
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search code snippets, functions, or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="search-button" onClick={() => handleSearch()}>
              <span>Search</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              {/* <FontAwesomeIcon icon={byPrefixAndName.fas['arrow-right']} /> */}
            </button>
          </div>

          <div className="suggestions">
            <span className="suggestions-label">Try searching:</span>
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                className="tag-btn"
                onClick={() => handleSuggestionClick(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}. Make sure the backend server is running on port 5000 and the Gemini API key is configured.
          </div>
        )}

        {loading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
            <p style={{ color: 'var(--text-secondary)' }}>Calculating query embeddings and similarity...</p>
          </div>
        ) : results.length > 0 ? (
          <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto 24px auto' }}>
            <div className="results-header">
              <h2>Search Results</h2>
              <span className="results-count">Top {results.length} matches</span>
            </div>
            
            <div className="results-grid">
              {results.map((result) => {
                const scorePercentage = Math.round(result.score * 100)
                const isHighMatch = result.score > 0.75
                
                return (
                  <article key={result.id} className="result-card">
                    <div className="card-top">
                      <div className="card-title-group">
                        <h3>{result.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left' }}>
                          Semantic ID: <code>{result.id}</code>
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className={`score-badge ${isHighMatch ? 'high-match' : ''}`}>
                          <span>Similarity:</span>
                          <strong>{scorePercentage}%</strong>
                        </div>
                        <div className="card-actions">
                          <button
                            className="action-btn"
                            title="Copy code to clipboard"
                            onClick={() => copyToClipboard(result.code, result.title)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="code-container">
                      <pre className="code-block">
                        <code>{result.code}</code>
                      </pre>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ) : (
          !loading && searchQuery && (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3>No results found</h3>
              <p>Try refining your query or selection terms.</p>
            </div>
          )
        )}
      </main>

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} ~ Akshay Bhat</p>
      </footer>
    </>
  )
}

export default App
