const config = `
sub, el-icon-location, 导航一
  group, ,分组一
    item, ,列表, /list
    item, ,用户列表, /user/list

sub, el-icon-location, 导航二
`
const parse = routes => {
  const root = {}
  const nodes = [root]
  let level = 0
  const tab = '  '

  config.split(/\n/).forEach((line, index) => {
    line = line.trimRight()
    if (!line) return

    let tabCount = 0
    const trimLine = line.replace(/^(\s*)/, (m, v) => {
      tabCount = v.length
      return ''
    })
    level = tabCount / tab.length
    const [type, icon, title, path] = trimLine.split(/\s*,\s*/)
    const node = { type, icon, title, path, index, pids: [] }

    if (path) {
      node['pids'] = [routes[path].meta.pid]
    }

    nodes[level + 1] = node
    const parentNode = nodes[level]
    if (!('children' in parentNode)) {
      parentNode.children = []
    }
    parentNode.children.push(node)
  })

  const mergePids = node => {
    let pids = node.pids
    ;(node.children || []).forEach(child => {
      pids = [...pids, ...mergePids(child)]
    })
    node.pids = Array.from(new Set(pids))
    return pids
  }
  root.children.map(mergePids)

  console.log(root)
  return root
}

export { parse }
