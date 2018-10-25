/*
This file will contain the functions for logic layer.
By separating it from controller, we are separating the concerns.
Thus we can use it from other non express callers like cron etc
*/
const mongoose = require('mongoose')

exports.removeDuplicates = function (pages) {
  let pagesToSend = []
  let connectedPages = pages.filter(page => page.connected === true)
  for (let i = 0; i < pages.length; i++) {
    if (!exists(pagesToSend, pages[i].pageId)) {
      if (connectedPages.map((cp) => cp.pageId).indexOf(pages[i].pageId) !== -1) {
        pages[i].connected = true
        pagesToSend.push(pages[0])
      } else {
        pagesToSend.push(pages[0])
      }
    }
    if ((pages.length - 1) === i) {
      return pagesToSend
    }
  }
}

exports.getCriterias = function (body, companyUser) {
  let search = ''
  let findCriteria = {}
  let finalCriteria = {}
  let recordsToSkip = 0
  if (!body.filter) {
    findCriteria = {
      companyId: companyUser.companyId,
      connected: true
    }
  } else {
    search = new RegExp('.*' + body.filter_criteria.search_value + '.*', 'i')
    findCriteria = Object.assign(findCriteria, {pageName: body.filter_criteria.search_value !== '' ? {$regex: search} : {$exists: true}})
  }
  if (body.first_page === 'first') {
    finalCriteria = [
      { $match: findCriteria },
      { $skip: recordsToSkip },
      { $limit: body.number_of_records }
    ]
  } else if (body.first_page === 'next') {
    recordsToSkip = Math.abs(((body.requested_page - 1) - (body.current_page))) * body.number_of_records
    finalCriteria = [
      { $match: { $and: [findCriteria, { _id: { $lt: mongoose.Types.ObjectId(body.last_id) } }] } },
      { $skip: recordsToSkip },
      { $limit: body.number_of_records }
    ]
  } else if (body.first_page === 'previous') {
    recordsToSkip = Math.abs(((body.requested_page) - (body.current_page - 1))) * body.number_of_records
    finalCriteria = [
      { $match: { $and: [findCriteria, { _id: { $gt: mongoose.Types.ObjectId(body.last_id) } }] } },
      { $skip: recordsToSkip },
      { $limit: body.number_of_records }
    ]
  }
  let countCriteria = [
    {$match: findCriteria},
    { $group: { _id: null, count: { $sum: 1 } } }
  ]
  return {countCriteria: countCriteria, fetchCriteria: finalCriteria}
}

function exists (list, content) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].pageId === content) {
      return true
    }
  }
  return false
}