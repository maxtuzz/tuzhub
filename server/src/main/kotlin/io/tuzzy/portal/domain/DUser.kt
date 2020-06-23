//package io.tuzzy.portal.domain
//
//import javax.persistence.Column
//import javax.persistence.Entity
//import javax.persistence.Table
//
//@Entity
//@Table(name = "user")
//class DUser(
//    // Users external id
//    extId: String,
//    username: String,
//    email: String,
//    pictureUrl: String? = null
//) : BaseDomain() {
//    @Column(unique = true, nullable = false, length = 45)
//    var extId: String = extId
//    @Column(unique = true, nullable = false, length = 25)
//    var username: String = username
//
//    var email = email
//    var pictureUrl = pictureUrl
//}