// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemData} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = itemData

  return (
    <li className="repository-item-bg-container">
      <img className="repository-item-avatar-img" src={avatarUrl} alt={name} />
      <h1 className="repository-item-name">{name}</h1>
      <ul className="repository-item-stats-list">
        <li className="repository-item-stat-container">
          <img
            className="repository-item-stat-icon-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="repository-item-stat-data">{`${starsCount} stars`}</p>
        </li>

        <li className="repository-item-stat-container">
          <img
            className="repository-item-stat-icon-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="repository-item-stat-data">{`${forksCount} forks`}</p>
        </li>

        <li className="repository-item-stat-container">
          <img
            className="repository-item-stat-icon-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="repository-item-stat-data">{`${issuesCount} open issues`}</p>
        </li>
      </ul>
    </li>
  )
}

export default RepositoryItem
