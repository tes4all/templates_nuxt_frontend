import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Button } from '~/components/ui/button'

describe('Button', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: { default: () => 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders as a link when as="a"', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { as: 'a' },
      slots: { default: () => 'Link' },
    })
    expect(wrapper.element.tagName).toBe('A')
  })
})
