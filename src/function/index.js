import Vue from 'vue'
import * as hooks from 'vue2hooks'
import date from './date'
import axios from './axios'
import rules from './rules'
import permisson from './permisson'
import util from './util'

const VueProto = Vue.prototype
VueProto.$hooks = hooks
VueProto.$axios = axios
VueProto.$date = date
VueProto.$rules = rules
VueProto.$permisson = permisson
VueProto.$util = util
