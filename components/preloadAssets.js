import { Asset } from 'expo'

export default function preloadAssetsAsync({images = []}) {
  return Promise.all([...preloadImages(images)])
}

function preloadImages(images) {
  return images.map((image) => {
    Asset.fromModule(image).downloadAsync()})
  }

