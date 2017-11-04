const auth = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Felix Volny',
        avatar: 'https://pbs.twimg.com/profile_images/889837623971270657/8RVcTqfI_400x400.jpg',
        uid: 'felixvolny',
      })
    }, 1000)
  })

export default auth
