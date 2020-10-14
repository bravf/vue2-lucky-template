import Vue from 'vue'
import * as hooks from 'vue2hooks'
import date from './base/date'
import axios from './base/axios'
import rules from './base/rules'
import state from './state/state'
import permisson from './state/permisson'

const VueProto = Vue.prototype
VueProto.$hooks = hooks
VueProto.$axios = axios
VueProto.$date = date
VueProto.$rules = rules
VueProto.$state = state
VueProto.$permisson = permisson
