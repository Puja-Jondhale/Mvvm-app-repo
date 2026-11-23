
const initialBranches = [
  {
    id: 1,
    branchName: "Baner"
  }
];

const BranchListModel = {
  getBranches() {
    return initialBranches;
  },

  addBranch(branches, branchName) {
    const newBranch = {
      id: Date.now(),
      branchName: branchName.trim()
    };

    return [...branches, newBranch];
  },

  updateBranch(branches, id, branchName) {
    return branches.map((branch) =>
      branch.id === id
        ? { ...branch, branchName: branchName.trim() }
        : branch
    );
  },

  deleteBranch(branches, id) {
    return branches.filter((branch) => branch.id !== id);
  }
};

export default BranchListModel;
