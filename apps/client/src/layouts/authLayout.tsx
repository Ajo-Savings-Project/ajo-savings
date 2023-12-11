// import classNames from 'classnames'
// import { useAuth } from 'contexts'
// import { Helmet } from 'react-helmet'
// import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
// import { routes } from 'router'
// import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
// import { Text } from '../components'
// import { HEADER_TITLE } from '../appConstants'
// import styles from './authLayout.module.scss'

// export const AuthLayoutFooter = ({ className }: { className?: string }) => {
//   return (
//     <footer className={classNames(styles.footer, className)}>
//       <Link to={'#'}>Privacy Policy</Link>
//       <Text size={'Small'}>&copy; 2023</Text>
//     </footer>
//   )
// }

// const AuthLayout = () => {
//   const { isAuth, showAutoLogoutMessage } = useAuth()
//   const location = useLocation()

//   if (isAuth) {
//     const prevPath = location.state?.from?.pathname
//     return <Navigate to={prevPath || routes.dashboard.root.path} replace />
//   }

//   const pageTitle = location.pathname

//   return (
//     <>
//       {showAutoLogoutMessage && (
//         <div style={{ backgroundColor: 'var(--primary-500)', padding: '1rem' }}>
//           <Text
//             style={{ textAlign: 'center' }}
//             color={'White'}
//             content={'You were logged out due to inactivity.'}
//           />
//         </div>
//       )}
//       <Helmet>
//         <meta charSet="utf-8" />
//         <title>{getHeaderTitle(pageTitle)}</title>
//       </Helmet>
//       <div className={styles.layout}>
//         <div className={styles.layoutBg}>
//           <Text
//             font={'Bodoni'}
//             className={classNames('app-logo')}
//             content={HEADER_TITLE}
//           />
//           <div>image</div>
//         </div>
//         <div className={styles.layoutForm}>
//           <section>
//             <Outlet />
//           </section>
//           <AuthLayoutFooter />
//         </div>
//       </div>
//     </>
//   )
// }

// export default AuthLayout

import classNames from 'classnames'
import { useAuth } from 'contexts'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routes } from 'router'
import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
import { Text } from '../components'
import { HEADER_TITLE } from '../appConstants'
import styles from './authLayout.module.scss'
import AjoLoginImg1 from './Image/AjoLoginImg1.jpeg'
import AjoLoginImg2 from './Image/AjologinImg2.jpeg'
import AjoLoginImg3 from './Image/AjoLoginImg3.jpeg'
import AjoLoginImg4 from './Image/AjoLoginImg4.jpeg'
import { useEffect, useState } from 'react'
const slideData = [
  {
    id: 1,
    slideImg: AjoLoginImg1,
    heading: 'Welcome to Ajó Savings1',
    desc: 'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 2,
    slideImg: AjoLoginImg2,
    heading: 'Welcome to Ajó Savings2',
    desc: 'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 3,
    slideImg: AjoLoginImg3,
    heading: 'Welcome to Ajó Savings3',
    desc: 'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 4,
    slideImg: AjoLoginImg4,
    heading: 'Welcome to Ajó Savings4',
    desc: 'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
]

const AuthLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { isAuth, showAutoLogoutMessage } = useAuth()
  const location = useLocation()

  const slideLength = slideData.length
  const autoScroll = true
  let slideInterval: number | undefined
  const intervalTime = 5000

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
  }

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime)
  }
  useEffect(() => {
    setCurrentSlide(0)
  }, [])

  useEffect(() => {
    if (autoScroll) {
      auto()
    }
    return () => clearInterval(slideInterval)
  }, [currentSlide])
  if (isAuth) {
    const prevPath = location.state?.from?.pathname
    return <Navigate to={prevPath || routes.dashboard.root.path} replace />
  }

  const pageTitle = location.pathname

  return (
    <>
      <Helmet title={getHeaderTitle(pageTitle)} />
      {showAutoLogoutMessage && (
        <div style={{ backgroundColor: 'var(--primary-500)', padding: '1rem' }}>
          <Text
            style={{ textAlign: 'center' }}
            color={'White'}
            content={'You were logged out due to inactivity.'}
          />
        </div>
      )}

      <div className={styles.layout}>
        <div className={styles.layoutBg}>
          <div className={styles.layoutHeaderContainer}>
            <Text
              font={'Bodoni'}
              className={classNames('app-logo')}
              content={HEADER_TITLE}
              color={'White'}
            />
          </div>
          <div style={{}}>
            {slideData.map((slide, index) => {
              return (
                <div key={index}>
                  <div
                    className={
                      index === currentSlide
                        ? `${styles.layoutSlide} ${styles.layoutCurrent}`
                        : `${styles.layoutSlide}`
                    }
                  >
                    {index === currentSlide && (
                      <>
                        <img
                          src={slide.slideImg}
                          alt="slide"
                          className={styles.layoutAllLoginimg}
                        />
                        <div className={styles.layoutContent}>
                          <Text
                            content={slide.heading}
                            size={'Subtext'}
                            color={'White'}
                          />
                          <Text
                            content={slide.desc}
                            size={'Small'}
                            color={'White'}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.layoutSlideCarousel}>
                    {slideData.map((singleData, item) => (
                      <div
                        key={item}
                        className={styles.layoutCarouselContainer}
                      >
                        <ul>
                          <li
                            className={
                              item === currentSlide
                                ? `${styles.layoutCarouselCurrent} ${styles.layoutCarouselAll}`
                                : `${styles.layoutCarouselAll}`
                            }
                            onClick={() => setCurrentSlide(item)}
                          >
                            {singleData.id}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          {/* <div className={styles.layoutSlideCarousel}
          // style={{ display: 'flex', position: 'absolute', top: '85%', left: '10%' }}
          >
            {slideData.map((singleData, item) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'row' }}>
                <ul style={{ display: 'flex', margin: '0.1rem', listStyleType: 'none', padding: `${item === currentSlide ? ' 0 10px' : '0'}` }}>
                  <li style={{ width: '25px', height: '25px', borderRadius: '5px', backgroundColor: 'blue', zIndex: '1656', fontSize: '1px', cursor: 'pointer' }} onClick={() => setCurrentSlide(item)}>{singleData.id}</li>
                </ul>
              </div>
            ))}
          </div> */}
        </div>
        <div className={styles.layoutForm}>
          <section>
            <Outlet />
          </section>
          <footer>footer</footer>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
