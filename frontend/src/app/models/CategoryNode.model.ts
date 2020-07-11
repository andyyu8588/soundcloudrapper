export class foursquareCategory {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: {
      prefix: string;
      suffix: string
    }
    categories?: CategoryNode[]
}

export class CategoryNode {
  categories: CategoryNode[]
  name: string
  checked?: boolean
  hidden?: boolean

  // need recursive contructor for hidden property in childs
  constructor() {

  }
}

/** Flat to-do item node with expandable and level information */
export class CategoryFlatNode {
  name: string;
  level: number;
  expandable: boolean;
}

// export class DisplayCategoryNode extends CategoryNode {
//   hidden: boolean

//   constructor(bool: boolean, obj: {[key: string]: any}) {
//     super(obj.categories, obj.name)
//     this.hidden = bool
//   }
// }
