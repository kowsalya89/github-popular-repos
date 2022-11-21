import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const repoDataFetchResponseStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class GithubPopularRepos extends Component {
  state = {
    selectedRepoLanguageId: 'ALL',
    popularRepoListForSelectedLanguage: [],
    repoDataFetchingStatus: repoDataFetchResponseStatus.initial,
  }

  componentDidMount() {
    this.onRepoLanguageSelect(languageFiltersData[0].id)
  }

  onRepoLanguageSelect = async repoLanguageId => {
    this.setState({
      repoDataFetchingStatus: repoDataFetchResponseStatus.loading,
      selectedRepoLanguageId: repoLanguageId,
    })

    let popularRepoList = []
    let responseStatus = null

    const repoDataFetchUrlString = `https://apis.ccbp.in/popular-repos?language=${repoLanguageId}`
    // let repoDataFetchUrlInstance = new URL(repoDataFetchUrlString)
    // repoDataFetchUrlInstance.
    const repoDataResponse = await fetch(repoDataFetchUrlString)

    if (repoDataResponse.ok) {
      const repoData = await repoDataResponse.json()
      popularRepoList = repoData.popular_repos.map(popularRepoEntry => ({
        id: popularRepoEntry.id,
        name: popularRepoEntry.name,
        issuesCount: popularRepoEntry.issues_count,
        forksCount: popularRepoEntry.forks_count,
        starsCount: popularRepoEntry.stars_count,
        avatarUrl: popularRepoEntry.avatar_url,
      }))
      responseStatus = repoDataFetchResponseStatus.success
    } else {
      responseStatus = repoDataFetchResponseStatus.failure
    }

    this.setState({
      popularRepoListForSelectedLanguage: popularRepoList,
      repoDataFetchingStatus: responseStatus,
    })
  }

  renderPopularRepoUI = (dataFetchStatus, fetchedPopularRepoList) => {
    let popularRepoUI = null

    if (dataFetchStatus === repoDataFetchResponseStatus.loading) {
      popularRepoUI = (
        <div>
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      )
    } else if (dataFetchStatus === repoDataFetchResponseStatus.success) {
      popularRepoUI = (
        <ul className="github-repo-list">
          {fetchedPopularRepoList.map(popularRepoListItem => (
            <RepositoryItem
              key={popularRepoListItem.id}
              itemData={popularRepoListItem}
            />
          ))}
        </ul>
      )
    } else if (dataFetchStatus === repoDataFetchResponseStatus.failure) {
      popularRepoUI = (
        <div className="failed-data-load-content-container">
          <img
            className="failed-data-load-img"
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <p className="failed-data-load-msg">Something Went Wrong</p>
        </div>
      )
    }

    return popularRepoUI
  }

  render() {
    const {
      selectedRepoLanguageId,
      popularRepoListForSelectedLanguage,
      repoDataFetchingStatus,
    } = this.state

    return (
      <div className="github-popular-repos-bg-container">
        <h1 className="github-popular-repos-header">Popular</h1>
        <ul className="github-repo-language-list">
          {languageFiltersData.map(languageFiltersDataItem => (
            <LanguageFilterItem
              key={languageFiltersDataItem.id}
              itemData={languageFiltersDataItem}
              itemClickHandler={this.onRepoLanguageSelect}
              isSelected={languageFiltersDataItem.id === selectedRepoLanguageId}
            />
          ))}
        </ul>
        {this.renderPopularRepoUI(
          repoDataFetchingStatus,
          popularRepoListForSelectedLanguage,
        )}
      </div>
    )
  }
}
