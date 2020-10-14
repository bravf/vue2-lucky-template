import Vue from 'vue'
import * as hooks from 'vue2hooks'
import date from './date'
import axios from './axios'
import rules from './rules'
import state from './state'
import permisson from './permisson'

const VueProto = Vue.prototype
VueProto.$hooks = hooks
VueProto.$axios = axios
VueProto.$date = date
VueProto.$rules = rules
VueProto.$state = state
VueProto.$permisson = permisson
