/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TranslationItem from "./TranslationItem"

import deletePlatform from '../actions/platforms/delete'

import editKey from '../actions/platforms/edit-key'

export class PlatformItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      keyId: this.props.keyId,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ keyId: nextProps.keyId })
  }

  handleChange(event) {
    this.setState({keyId: event.target.value})
  }

  handleBlur(event) {
    const { editKey, entryId, platformCode } = this.props
    editKey(entryId, { platformCode, updatedKey: event.target.value })
  }

  renderTranslations(translation, index) {
    return (
      <TranslationItem
        key={translation.localeCode} {...translation}
        isDeleted={this.props.deleted}
        platformCode={this.props.platformCode}
        entryId={this.props.entryId} />
    )
  }

  render() {
    const {platformCode, translations, hidden, _id, entryId, selectedLocales, deleted} = this.props
    let selectedTranslations = translations
    if (selectedLocales.length !== 0) selectedTranslations = translations.filter((trans) => selectedLocales.includes(trans.localeCode))
    return (
      <tr className={hidden ? "hide" : "show"}>
        <td className="text-center">
          { deleted || platformCode === "default" ? null :
            <button
              className="button tinyer alert"
              onClick={() => {if(confirm('Delete the item?')) {this.props.deletePlatform(entryId, {_id, remove: true})}}}>
              X
            </button>
          }
        </td>
        <td className="text-center uppercase">{platformCode}</td>
        <td colSpan="4">
          <div className="grid-x">
            <div className="cell small-1">
              <label
                htmlFor="middle-label"
                className="text-left middle">Key
              </label>
            </div>
            <div className="cell small-11">
              <input
                type="text"
                id="middle-label"
                value={this.state.keyId}
                onChange={this.handleChange.bind(this)}
                disabled={deleted}
                onBlur={this.handleBlur.bind(this)}
                placeholder="Trans Key"/>
            </div>
          </div>
          { selectedTranslations.map(this.renderTranslations.bind(this)) }
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
})

export default connect(mapStateToProps, { deletePlatform, editKey })(PlatformItem)
