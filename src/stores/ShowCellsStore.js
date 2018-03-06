const ShowCellsStore = {
  state: {
    showCells: [
      { type: "date", content: "", label: "Date" },
      { type: "text", content: "", label: "Venue" },
      { type: "text", content: "", label: "Description" },
      { type: "tel", content: "", label: "Phone Number" },
      { type: "url", content: "", label: "Website" },
      { type: "text", content: "", label: "Display City" },
      { type: "textarea", content: "", label: "Full Address" },
      { type: "number", content: "", label: "Latitude" },
      { type: "number", content: "", label: "Longitude" }
    ]
  },
  set(index, prop, payload) {
    this.state.showCells[index][prop] = payload;
  }
};

export default ShowCellsStore;
