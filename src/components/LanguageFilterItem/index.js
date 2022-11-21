// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemData, itemClickHandler, isSelected} = props
  const {id, language} = itemData

  const onLanguageFilterSelect = () => itemClickHandler(id)

  return (
    <li
      className={`language-filter-item-container ${
        isSelected && 'selected-language'
      }`}
    >
      <button
        type="button"
        className="language-filter-item-button"
        onClick={onLanguageFilterSelect}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem