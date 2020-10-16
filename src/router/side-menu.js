const config = `
sub, el-icon-location, 用户管理
  item,,, /list
  item,,, /user/list

sub, el-icon-location, 导航二
`
const parse = routes => {
  const root = { children: [] }
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
    const node = { type, icon, title, path, index, pids: [], children: [] }

    if (!node.title && path) {
      node.title = routes[path].meta.title
    }

    if (path) {
      node['pids'] = [routes[path].meta.pid]
    }

    nodes[level + 1] = node
    const parentNode = nodes[level]
    parentNode.children.push(node)
  })

  const mergePids = node => {
    let pids = node.pids
    node.children.forEach(child => {
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
