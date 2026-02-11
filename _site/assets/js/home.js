

document.addEventListener("DOMContentLoaded", () => {

  // Date Picker Logic
  const stayDatesInput = document.getElementById("stay-dates-input");
  const stayDatesDisplay = document.getElementById("stay-dates-display");

  if (stayDatesInput && stayDatesDisplay && window.Litepicker) {
    const picker = new Litepicker({
      element: stayDatesInput,
      singleMode: false,
      format: "DD MMM, YYYY",
      numberOfMonths: 1,
      numberOfColumns: 1,
      mobileFriendly: true,
      setup: (picker) => {
        picker.on("selected", (date1, date2) => {
          stayDatesDisplay.textContent = `${date1.format(
            "DD MMM"
          )} - ${date2.format("DD MMM, YYYY")}`;
        });
      },
    });

    // Set default date logic if needed, or leave as placeholder
    // picker.setDateRange(new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000));
  }

  // Guest Selector Logic
  const guestsContainer = document.getElementById("guests-container");
  const guestsTrigger = document.getElementById("guests-trigger");
  const guestsDropdown = document.getElementById("guests-dropdown");
  const guestsDisplay = document.getElementById("guests-display");
  const guestsArrow = document.querySelector(".guests-arrow");
  const adultsCountSpan = document.getElementById("adults-count");
  const childrenCountSpan = document.getElementById("children-count");

  let adults = 2;
  let children = 0;

  if (guestsContainer && guestsTrigger && guestsDropdown) {
    // Toggle Dropdown
    guestsTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      guestsDropdown.classList.toggle("hidden");
      guestsArrow?.classList.toggle("rotate-180");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!guestsContainer.contains(e.target)) {
        guestsDropdown.classList.add("hidden");
        guestsArrow?.classList.remove("rotate-180");
      }
    });

    // Prevent closing when clicking inside dropdown
    guestsDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Handle Buttons
    guestsDropdown.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const isPlus = btn.classList.contains("guest-btn-plus");

        if (type === "adults") {
          if (isPlus) adults++;
          else if (adults > 1) adults--;
          adultsCountSpan.textContent = adults;
        } else if (type === "children") {
          if (isPlus) children++;
          else if (children > 0) children--;
          childrenCountSpan.textContent = children;
        }

        updateGuestDisplay();
      });
    });

    function updateGuestDisplay() {
      const adultText = adults === 1 ? "Adult" : "Adults";
      const childText = children === 1 ? "Child" : "Children";
      // Format: "02 Adults, 01 Child"
      const formattedAdults = adults.toString().padStart(2, "0");
      const formattedChildren = children.toString().padStart(2, "0");

      if (children > 0) {
        guestsDisplay.textContent = `${formattedAdults} ${adultText}, ${formattedChildren} ${childText}`;
      } else {
        guestsDisplay.textContent = `${formattedAdults} ${adultText}`;
      }
    }
  }
});
