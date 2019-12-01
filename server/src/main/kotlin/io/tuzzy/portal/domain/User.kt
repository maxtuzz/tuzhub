package io.tuzzy.portal.domain

class User(val firstName: String, val address: String) {
    val userKey = firstName.toUpperCase()
}