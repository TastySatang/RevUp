import React from 'react'

export default function Footer() {

  return (
    <div className='footer__container'>
      <div>
        <span>Junyeob Lee</span>
        <div className='socials'>
          <a href='https://github.com/TastySatang' target='_blank'>
            <i className="fab fa-github" aria-hidden="true" />
          </a>
          <a href='https://www.linkedin.com/in/junyeob-lee-10a87621b/' target='_blank'>
            <i className="fab fa-linkedin" aria-hidden="true" />
          </a>
          <a href="https://angel.co/u/junyeob-lee" target='_blank'>
            <i className="fab fa-angellist" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
