const imageModules = import.meta.glob('@/assets/imgs/portfolio/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

export const projectImages: Record<string, string> = {}

Object.entries(imageModules).forEach(([path, url]) => {
  const normalized = path.replace(/\\/g, '/')
  const marker = '/assets/imgs/portfolio/'
  const idx = normalized.lastIndexOf(marker)

  const relative =
    idx >= 0 ? normalized.slice(idx + marker.length) : normalized.split('/').slice(-2).join('/')

  const key = relative.replace(/\.(png|jpg|jpeg|webp)$/, '')

  projectImages[key] = url as string
})
