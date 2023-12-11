import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Text } from 'components'
import { HEADER_TITLE } from 'appConstants'
import styles from './authcarousel.module.scss'
import AjoLoginImg1 from './Image/img1.jpeg'
import AjoLoginImg2 from './Image/img2.jpeg'
import AjoLoginImg3 from './Image/img3.jpeg'
import AjoLoginImg4 from './Image/img4.jpeg'

const slideData = [
  {
    id: 1,
    slideImg: AjoLoginImg1,
    heading: 'Welcome to Ajó Savings1',
    description:
      'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 2,
    slideImg: AjoLoginImg2,
    heading: 'Welcome to Ajó Savings2',
    description:
      'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 3,
    slideImg: AjoLoginImg3,
    heading: 'Welcome to Ajó Savings3',
    description:
      'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
  {
    id: 4,
    slideImg: AjoLoginImg4,
    heading: 'Welcome to Ajó Savings4',
    description:
      'Start saving securely and hassle-free with Ajó Savings the smart savings platform.',
  },
]

let slideInterval: NodeJS.Timeout
const AuthCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    slideInterval = setInterval(() => {
      setCurrentSlide(
        currentSlide === slideData.length - 1 ? 0 : currentSlide + 1
      )
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [currentSlide])

  return (
    <div className={styles.carousel}>
      <Text
        font={'Bodoni'}
        className={classNames('app-logo', styles.carouselLogo)}
        content={HEADER_TITLE}
        color={'White'}
      />
      <div className={styles.carouselImages}>
        {slideData.map(({ slideImg, id }, idx) => (
          <img
            key={id}
            src={slideImg}
            alt={`slide image ${idx + 1}`}
            className={classNames(styles.carouselImagesImage, {
              [styles.carouselImagesActive]: currentSlide === idx,
            })}
          />
        ))}

        <div className={styles.carouselDescription}>
          <Text
            content={slideData[currentSlide].heading}
            size={'Subtext'}
            color={'White'}
          />
          <Text
            content={slideData[currentSlide].description}
            size={'Small'}
            color={'White'}
          />
          <ul>
            {slideData.map((_, idx) => (
              <li key={idx}>
                <button
                  className={classNames(styles.carouselDescriptionButton, {
                    [styles.carouselDescriptionButtonActive]:
                      currentSlide === idx,
                  })}
                  onClick={() => setCurrentSlide(idx)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AuthCarousel
