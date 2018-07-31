import React from 'react'
import Text from '../convo/Text'
import Image from '../convo/Image'
import Audio from '../convo/Audio'
import Video from '../convo/Video'
import File from '../convo/File'
import List from '../convo/List'
import Media from '../convo/Media'
export function transformData (data) {
  data = JSON.parse(JSON.stringify(data))
  data.map((item) => {
    item.submenu.map((sub) => {
      if (sub.submenu && sub.submenu.length > 0) {
        sub.type = 'nested'
        sub.call_to_actions = sub.submenu
        delete sub.submenu
        delete sub.url
      } else {
        delete sub.submenu
      }
    })
    if (item.submenu && item.submenu.length > 0) {
      item.type = 'nested'
      item.call_to_actions = item.submenu
      delete item.submenu
      delete item.url
    } else {
      delete item.submenu
    }
  })
  var final = {}
  final.persistent_menu = [{locale: 'default', call_to_actions: data}]
  JSONstringify(final)
  return final
}

export function getUrl (data, str) {
  var temp = data
  var index = str.split('-')
  switch (index[0]) {
    case 'item':
      if (temp[index[1]]) {
        if (temp[index[1]].submenu && temp[index[1]].submenu.length === 0) {
          return {placeholder: temp[index[1]].url, nested: false}
        } else {
          return {placeholder: '', nested: true}
        }
      }
      break
    case 'submenu':
      if (temp[index[1]] && temp[index[1]].submenu[index[2]]) {
        if (temp[index[1]].submenu[index[2]].submenu &&
          temp[index[1]].submenu[index[2]].submenu.length === 0) {
          return {
            placeholder: temp[index[1]].submenu[index[2]].url,
            nested: false
          }
        } else {
          return {placeholder: '', nested: true}
        }
      }
      break
    case 'nested':
      if (temp[index[1]]) {
        if (temp[index[1]].submenu[index[2]].submenu[index[3]]) {
          return {
            placeholder: temp[index[1]].submenu[index[2]].submenu[index[3]].url,
            nested: false
          }
        }
      }
      break

    default:
      return 'default'
  }
}

function JSONstringify (json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, '\t')
  }

  var arr = []
  var _string = 'color:green'
  var _number = 'color:darkorange'
  var _boolean = 'color:blue'
  var _null = 'color:magenta'
  var _key = 'color:red'

// eslint-disable-next-line no-useless-escape
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var style = _number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          style = _key
        } else {
          style = _string
        }
      } else if (/true|false/.test(match)) {
        style = _boolean
      } else if (/null/.test(match)) {
        style = _null
      }
      arr.push(style)
      arr.push('')
      return '%c' + match + '%c'
    })

  arr.unshift(json)
  console.log.apply(console, arr)
}
export function removeMenuPayload () {
  var payload = {}
  payload.persistent_menu = [{locale: 'default', composer_input_disabled: false}]
  JSONstringify(payload)
  return payload
}

export function onClickText (timeStamp, refObj) {
  console.log('in custom onClickTextComponnet')
  let temp = refObj.state.list
  refObj.msg.info('New Text Component Added')
  refObj.setState({ list: [...temp, { content: (<Text id={timeStamp} key={timeStamp} handleText={refObj.handleText} onRemove={refObj.removeComponent} removeState />) }] })
  refObj.handleText({ id: timeStamp, text: '', button: [] })
}

export function onImageClick (timeStamp, refObj) {
  console.log('in custome onImageClick Component')
  let temp = refObj.state.list
  refObj.msg.info('New Image Component Added')
  refObj.setState({list: [...temp, {content: (<Image id={timeStamp} key={timeStamp} handleImage={refObj.handleImage} onRemove={refObj.removeComponent} />)}]})
  refObj.handleImage({id: timeStamp, componentType: 'image', image_url: '', fileurl: ''})
}

export function onAudioClick (timeStamp, refObj) {
  console.log('in Audio Click Function')
  let temp = refObj.state.list
  refObj.msg.info('New Audio Component Added')
  refObj.setState({list: [...temp, {content: (<Audio id={timeStamp} key={timeStamp} handleFile={refObj.handleFile} onRemove={refObj.removeComponent} />)}]})
  refObj.handleFile({id: timeStamp, componentType: 'audio', fileurl: ''})
}
export function onVideoClick (timeStamp, refObj) {
  console.log('in Video Click Function')
  let temp = refObj.state.list
  refObj.msg.info('New Video Component Added')
  refObj.setState({list: [...temp, {content: (<Video id={timeStamp} key={timeStamp} handleFile={refObj.handleFile} onRemove={refObj.removeComponent} />)}]})
  refObj.handleFile({id: timeStamp, componentType: 'video', fileurl: ''})
}

export function onFileClick (timeStamp, refObj) {
  console.log('in File component')
  let temp = refObj.state.list
  refObj.msg.info('New File Component Added')
  refObj.setState({list: [...temp, {content: (<File id={timeStamp} key={timeStamp} handleFile={refObj.handleFile} onRemove={refObj.removeComponent} />)}]})
  refObj.handleFile({id: timeStamp, componentType: 'file', fileurl: ''})
}
export function onListClick (timeStamp, refObj) {
  console.log('in List Component')
  let temp = refObj.state.list
  refObj.msg.info('New List Component Added')
  refObj.setState({list: [...temp, {content: (<List id={timeStamp} key={timeStamp} handleList={refObj.handleList} onRemove={refObj.removeComponent} />)}]})
  refObj.handleList({id: timeStamp, componentType: 'list', listItems: [], topElementStyle: 'compact'})
}
export function onMediaClick (timeStamp, refObj) {
  console.log('in Media component')
  let temp = refObj.state.list
  refObj.msg.info('New Media Component Added')
  refObj.setState({list: [...temp, {content: (<Media id={timeStamp} key={timeStamp} handleMedia={refObj.handleMedia} onRemove={refObj.removeComponent} />)}]})
  refObj.handleMedia({id: timeStamp, componentType: 'media', fileurl: '', buttons: []})
}
