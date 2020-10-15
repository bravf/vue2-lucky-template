<script>
import { sideMenuConfig } from '@/router/router'
import permisson from '@/function/permisson'

export default {
  name: 'SideMenu',
  data() {
    return {}
  },
  methods: {
    _generate() {
      const h = this.$createElement
      const f = node => {
        if (!permisson.check(...node.pids)) return null
        const tag = {
          menu: '',
          sub: 'el-submenu',
          group: 'el-menu-item-group',
          item: 'el-menu-item',
        }[node.type]
        const children = (node.children || []).map(f)
        const title = h('template', { slot: 'title' }, [
          node.icon ? h('i', { class: { [node.icon]: true } }) : null,
          h('span', [node.title]),
        ])
        return h(tag, { props: { index: node.path || node.index.toString() } }, [
          title,
          ...children,
        ])
      }
      return sideMenuConfig.children.map(f)
    },
  },
  computed: {
    active() {
      return this.$route.path
    },
  },
  render(h) {
    const me = this
    return h(
      'el-menu',
      {
        props: {
          'default-active': this.active,
        },
        on: {
          select(index) {
            me.$router.push({ path: index })
          },
        },
      },
      [this._generate()],
    )
  },
}
</script>
