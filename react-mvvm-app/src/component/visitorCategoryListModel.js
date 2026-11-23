
const initialCategories = [
  {
    id: 1,
    categoryName: "Domestic Visitors",
    requiredApprovals: "No"
  },
  {
    id: 2,
    categoryName: "Business Visitors",
    requiredApprovals: "No"
  },
  {
    id: 3,
    categoryName: "Site Visit Visitors",
    requiredApprovals: "No"
  },
  {
    id: 4,
    categoryName: "VIP Visitors",
    requiredApprovals: "No"
  },
  {
    id: 5,
    categoryName: "Vendor",
    requiredApprovals: "No"
  }
];

const VisitorCategoryListModel = {

  getCategories() {
    return initialCategories.map(item => ({ ...item }));
  },

  addCategory(categories, categoryName, requiredApprovals) {
    return [
      ...categories,
      {
        id: Date.now(),
        categoryName,
        requiredApprovals
      }
    ];
  },

  updateCategory(categories, id, categoryName, requiredApprovals) {
    return categories.map(item =>
      item.id === id
        ? {
            ...item,
            categoryName,
            requiredApprovals
          }
        : item
    );
  },

  deleteCategory(categories, id) {
    return categories.filter(item => item.id !== id);
  }

};

export default VisitorCategoryListModel;
