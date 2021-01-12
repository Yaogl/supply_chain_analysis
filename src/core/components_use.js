
/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import {
  Layout,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Modal,
  Icon,
  Steps,
  message,
  Timeline,
  Radio,
  Slider
} from 'ant-design-vue'
// import VueCropper from 'vue-cropper'

Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(Steps)
Vue.use(message)
Vue.use(Timeline)
Vue.use(Radio)
Vue.use(Slider)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

