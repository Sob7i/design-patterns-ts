enum Size {
  S = 's',
  M = 'm',
  L = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

interface Tshirt {
  name: string
  color: string
  size: Size
}

function createProduct<DataType>() {
  const variants: Set<DataType> = new Set()

  return {
    setVariant(v: DataType) {
      variants.add(v)
    },
    create(v: DataType) {
      console.log(`v`, v)
    },
  }
}

const product = createProduct()

const tshirt: Tshirt = {
  name: 'Cool shirt',
  color: 'blue',
  size: Size.M,
}

product.setVariant(tshirt)
const createTshirt = product.create(tshirt)

console.log(`createTshirt`, createTshirt)
