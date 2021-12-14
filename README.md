<p align="center">
  <img width="256" height="256" src="https://github.com/oktaykcr/bom-app-be/blob/master/bom-app-logo.png"  alt="logo"/>
</p>

<h3 align="center">BOM App Frontend</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/oktaykcr/bom-app-fe.svg)](https://github.com/oktaykcr/bom-app-fe/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/oktaykcr/bom-app-fe.svg)](https://github.com/oktaykcr/bom-app-fe/pulls)

</div>

---

<p align="center"> Manage your components easily.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

- A bill of materials (BOM) is a comprehensive list of parts, items, assemblies, subassemblies, intermediate assemblies,
  documents, drawings, and other materials required to create a product.
- **BOM App** is web application that developed for material tracking and management. In the app you have an inventory
  for your components. It uses [Mouser Electronics API](https://eu.mouser.com/) to fetch necessary information about
  component. For managing components of your project, you need to create a *BOM*. This process is like creating a new
  project. You can create components into created BOM from your inventory. It automatically adjusts quantity on hand
  according to look at inventory.

## 🏁 Getting Started <a name = "getting_started"></a>

The project consist of two side. The [backend](https://github.com/oktaykcr/bom-app-be) side is developed with Java Spring Boot,
the frontend side is developed with ReactJs.

### Prerequisites

- Install *Docker* to execute docker-compose.

### Installing

1. Create a Docker Image:
    - `docker-compose build`
2. Run the Docker Container:
    - `docker run -d -it -p 80:80 --name bom-app-fe bom-app-fe`
3. See BOM app at browser:
    - `http://localhost/`

docker runing containers output:

```
df69be525a1b bom-app-fe "/docker-entrypoint.…" 4 minutes ago Up 4 minutes 0.0.0.0:80->80/tcp bom-app-fe
```

## 🎈 Usage <a name="usage"></a>

- Create an account with username, email and password.
- Click `Components` section then click `+` button to add new components into your inventory.
- In the [Mouser](https://eu.mouser.com/) app search any component to get mouser part number.
- Enter *quantity on hand*, *supplier link* and *mouser part number* to create component into your inventory. (Example
  mouser part number of capacitor: `80-C1210C331KDGAUTO`)
- Click BOMs then click `+` button to add a BOM. BOMs are like a new projects.
- Enter *title* and *description* of the BOM.
- Click show button of newly created BOM.
- Click `+` button to add component to use for BOM.
- Choose already created component from your inventory list.
- Enter *quantity*, *cost* and *lead time* to create component to use.

Repeat these steps and manage your components easily.

## 🚀 Deployment <a name = "deployment"></a>

TODO

## ⛏️ Built Using <a name = "built_using"></a>

`bom-app-fe` uses following technologies and frameworks:

- ReactJS: 17.0.2
- [Base structure of bom-app-fe generated with *create-react-app*](https://create-react-app.dev/).
- [daistyUI Tailwind CSS Components](https://daisyui.com/)
- [axios](https://axios-http.com/): 0.21.1
- [react-csv](https://www.npmjs.com/package/react-csv): 2.0.3
- [react-hook-form](https://react-hook-form.com/): 7.20.5
- [react-icons](https://react-icons.github.io/react-icons/): 4.3.1
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner): 4.0.0
- [react-redux](https://react-redux.js.org/): 7.2.4
- [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start): 5.2.1
- [react-select](https://react-select.com/home): 5.2.1
- [react-table](https://react-table.tanstack.com/): 7.7.0
- [react-toastify](https://www.npmjs.com/package/react-toastify): 8.0.3
- [react-paginate](https://www.npmjs.com/package/react-paginate): 8.0.1
- [yup](https://react-hook-form.com/advanced-usage): 0.32.11

## ✍️ Authors <a name = "authors"></a>

- [@oktaykcr](https://github.com/oktaykcr) - Design and implement
- [@okankocer](https://linkedin.com/in/okan-koçer-b3327615b) - Idea

See also the list of [contributors](https://github.com/oktaykcr/bom-app-fe/contributors) who
participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [Mouser Electronics](https://eu.mouser.com/)
