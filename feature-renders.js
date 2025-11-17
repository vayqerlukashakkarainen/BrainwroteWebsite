// Feature Container Render Functions
// This file contains all render functions for the animated feature containers

// ========== DOM UTILITY HELPERS ==========

/**
 * Ensures a stage container exists and returns it
 */
function ensureStageContainer(parent) {
	let stageContainer = parent.querySelector(".search-stage-container");
	if (!stageContainer) {
		stageContainer = document.createElement("div");
		stageContainer.className = "search-stage-container";
		parent.appendChild(stageContainer);
	}
	return stageContainer;
}

/**
 * Creates a search input wrapper with text and optional placeholder
 */
function createSearchWrapper(text = "", placeholder = "", animate = false) {
	const wrapper = document.createElement("div");
	wrapper.className = "search-input-wrapper";
	wrapper.innerHTML = `
		<i class="search-icon" data-lucide="search"></i>
		<div class="search-input">
			<span class="search-input-text">${text}</span>
			${placeholder ? `<span class="search-input-placeholder">${placeholder}</span>` : ""}
		</div>
	`;
	return wrapper;
}

/**
 * Animates typing in a search input
 */
function animateSearchTyping(container, searchQuery, speed = 40, delay = 300) {
	setTimeout(() => {
		const textElement = container.querySelector(".search-input-text");
		const placeholder = container.querySelector(".search-input-placeholder");
		if (textElement) {
			let i = 0;
			const typeInterval = setInterval(() => {
				if (i < searchQuery.length) {
					textElement.textContent += searchQuery[i];
					if (i === 0 && placeholder) {
						placeholder.style.display = "none";
					}
					i++;
				} else {
					clearInterval(typeInterval);
				}
			}, speed);
		}
	}, delay);
}

/**
 * Removes an element if it exists
 */
function removeIfExists(parent, selector) {
	const element = parent.querySelector(selector);
	if (element) {
		element.remove();
	}
}

/**
 * Gets or creates an element
 */
function getOrCreate(parent, selector, createElement) {
	let element = parent.querySelector(selector);
	if (!element) {
		element = createElement();
		parent.appendChild(element);
	}
	return element;
}

// ========== DROP ZONE & FILE MANAGEMENT RENDERS ==========
function renderDropZone(container) {
	const stageContainer = ensureStageContainer(container);

	// Create drop zone if it doesn't exist
	if (!stageContainer.querySelector(".drop-zone-container")) {
		const dropZone = document.createElement("div");
		dropZone.className = "drop-zone-container";
		dropZone.innerHTML = `
			<div class="drop-zone-border">
				<i class="folder-icon" data-lucide="folder"></i>
				<div class="drop-zone-text">Drop files here</div>
			</div>
		`;
		stageContainer.appendChild(dropZone);
		lucide.createIcons();

		// Trigger drop animation after 1.5s
		setTimeout(() => {
			const folderIcon = stageContainer.querySelector(".folder-icon");
			if (folderIcon) {
				folderIcon.classList.add("dropping");
			}
		}, 1500);
	}
}

function renderFileList(container) {
	const files = [
		"Meeting notes.txt",
		"Project brief.pdf",
		"Budget_2024.xlsx",
		"Design mockups.fig",
		"Research data.csv",
	];

	const stageContainer = ensureStageContainer(container);

	// Remove drop zone and add file list
	removeIfExists(stageContainer, ".drop-zone-container");

	if (!stageContainer.querySelector(".file-list-container")) {
		const fileListContainer = document.createElement("div");
		fileListContainer.className = "file-list-container";

		files.forEach((name, i) => {
			const fileItem = document.createElement("div");
			fileItem.className = "file-item";
			fileItem.dataset.filename = name;
			fileItem.style.animationDelay = `${i * 100}ms`;
			fileItem.innerHTML = `
				<i class="file-icon" data-lucide="file-text"></i>
				<span class="file-name">${name}</span>
			`;
			fileListContainer.appendChild(fileItem);
		});

		const moreFilesText = document.createElement("div");
		moreFilesText.className = "more-files-text";
		moreFilesText.textContent = "12 more files...";
		fileListContainer.appendChild(moreFilesText);

		stageContainer.appendChild(fileListContainer);
		lucide.createIcons();
	}
}

function renderFilteredFileList(container) {
	const searchQuery = "How do I design the meeting slides";
	const matchingFiles = ["Meeting notes.txt", "Design mockups.fig"];

	const stageContainer = ensureStageContainer(container);

	// Wrap file list in filter container and add search if needed
	let fileListContainer = stageContainer.querySelector(".file-list-container");
	if (!stageContainer.querySelector(".filter-container")) {
		const filterContainer = document.createElement("div");
		filterContainer.className = "filter-container";

		// Add search input
		const searchWrapper = createSearchWrapper("", "");
		filterContainer.appendChild(searchWrapper);

		// Move existing file list into filter container
		if (fileListContainer) {
			stageContainer.removeChild(fileListContainer);
			filterContainer.appendChild(fileListContainer);
		}

		stageContainer.appendChild(filterContainer);
		lucide.createIcons();

		// Animate typing effect
		animateSearchTyping(container, searchQuery, 50, 200);
	}

	// Update file items to show filtered state
	const fileItems = stageContainer.querySelectorAll(".file-item");
	fileItems.forEach((item) => {
		const fileName = item.dataset.filename;
		if (!matchingFiles.includes(fileName)) {
			item.classList.add("filtered-out");
		}
	});

	// Update more files text
	const moreFilesText = stageContainer.querySelector(".more-files-text");
	if (moreFilesText) {
		moreFilesText.textContent = `${matchingFiles.length} matching files...`;
	}
}

// Third-Party App Search Renders
function renderSearchInput(container) {
	const searchQuery = "How should we build the dashboard";
	const stageContainer = ensureStageContainer(container);

	// Create search wrapper if it doesn't exist
	if (!stageContainer.querySelector(".search-input-wrapper")) {
		const searchWrapper = createSearchWrapper("", "Search across all apps...");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();

		// Animate typing
		animateSearchTyping(container, searchQuery, 40, 300);
	}
}

function renderThirdPartyIcons(container) {
	const apps = [
		{ name: "Slack", icon: "devicon-slack-plain", type: "devicon" },
		{ name: "GitHub", icon: "devicon-github-original", type: "devicon" },
		{
			name: "Confluence",
			icon: "devicon-confluence-original",
			type: "devicon",
		},
		{ name: "Jira", icon: "devicon-jira-plain", type: "devicon" },
		{ name: "Trello", icon: "devicon-trello-plain", type: "devicon" },
		{ name: "Linear", icon: "gauge", type: "lucide" },
		{ name: "Calendar", icon: "calendar", type: "lucide" },
		{ name: "Drive", icon: "folder", type: "lucide" },
	];

	const stageContainer = ensureStageContainer(container);

	// Ensure search exists with final text
	let searchWrapper = stageContainer.querySelector(".search-input-wrapper");
	if (!searchWrapper) {
		searchWrapper = createSearchWrapper("How should we build the dashboard");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();
	}

	// Add icons grid if it doesn't exist
	if (!stageContainer.querySelector(".third-party-icons-grid")) {
		const iconsGrid = document.createElement("div");
		iconsGrid.className = "third-party-icons-grid";

		apps.forEach((app, i) => {
			const iconItem = document.createElement("div");
			iconItem.className = "third-party-icon-item";
			iconItem.style.animationDelay = `${i * 80}ms`;

			// Use devicon or lucide based on type
			const iconHTML =
				app.type === "devicon"
					? `<i class="${app.icon} colored"></i>`
					: `<i data-lucide="${app.icon}"></i>`;

			iconItem.innerHTML = `
				${iconHTML}
				<span class="third-party-icon-label">${app.name}</span>
			`;
			iconsGrid.appendChild(iconItem);
		});

		stageContainer.appendChild(iconsGrid);
		lucide.createIcons();
	}
}

function renderFilteredThirdPartyIcons(container) {
	const matchingApps = ["Slack", "GitHub"];
	const stageContainer = ensureStageContainer(container);

	// Icons should already exist, add filtered-out class to non-matching apps
	const iconItems = stageContainer.querySelectorAll(".third-party-icon-item");
	iconItems.forEach((item) => {
		const label = item.querySelector(".third-party-icon-label");
		if (label && !matchingApps.includes(label.textContent)) {
			item.classList.add("filtered-out");
		}
	});
}

function renderSearchResults(container) {
	const results = [
		{
			source: "Slack",
			icon: "slack",
			text: "John mentioned using a component library for faster development",
		},
		{
			source: "GitHub",
			icon: "github",
			text: "Issue #234: Dashboard architecture discussion and implementation",
		},
		{
			source: "Slack",
			icon: "slack",
			text: "Team agreed on using charts.js for data visualization",
		},
	];

	const stageContainer = ensureStageContainer(container);

	// Ensure search exists
	let searchWrapper = stageContainer.querySelector(".search-input-wrapper");
	if (!searchWrapper) {
		searchWrapper = createSearchWrapper("How should we build the dashboard");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();
	}

	// Remove icons grid and add results
	removeIfExists(stageContainer, ".third-party-icons-grid");

	if (!stageContainer.querySelector(".search-results-container")) {
		const resultsContainer = document.createElement("div");
		resultsContainer.className = "search-results-container";

		results.forEach((result, i) => {
			const resultItem = document.createElement("div");
			resultItem.className = "search-result-item";
			resultItem.style.animationDelay = `${i * 150}ms`;
			resultItem.innerHTML = `
				<div class="search-result-icon">
					<i data-lucide="${result.icon}"></i>
				</div>
				<div class="search-result-content">
					<div class="search-result-source">${result.source}</div>
					<div class="search-result-text">${result.text}</div>
				</div>
			`;
			resultsContainer.appendChild(resultItem);
		});

		stageContainer.appendChild(resultsContainer);
		lucide.createIcons();
	}
}

// Pricing Search Renders
function renderPricingSearch(container) {
	const searchQuery = "What did we say about pricing?";
	const stageContainer = ensureStageContainer(container);

	// Create search wrapper if it doesn't exist
	if (!stageContainer.querySelector(".search-input-wrapper")) {
		const searchWrapper = createSearchWrapper("", "Search your notes...");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();

		// Animate typing
		animateSearchTyping(container, searchQuery, 40, 300);
	}
}

function renderPricingTranscript(container) {
	const stageContainer = ensureStageContainer(container);

	// Ensure search exists with final text
	let searchWrapper = stageContainer.querySelector(".search-input-wrapper");
	if (!searchWrapper) {
		searchWrapper = createSearchWrapper("What did we say about pricing?");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();
	}

	// Add transcript content if it doesn't exist
	if (!stageContainer.querySelector(".transcript-content")) {
		const transcriptDiv = document.createElement("div");
		transcriptDiv.className = "transcript-content";
		transcriptDiv.innerHTML = `
			<p class="transcript-text">
				After reviewing the market analysis, we decided 
				<span class="transcript-highlight">the pricing was set to $5 each month</span>. 
				This aligns with our value proposition and competitive positioning.
			</p>
		`;
		stageContainer.appendChild(transcriptDiv);
	}
}

function renderPricingDecisionLink(container) {
	const stageContainer = ensureStageContainer(container);

	// Ensure search exists
	let searchWrapper = stageContainer.querySelector(".search-input-wrapper");
	if (!searchWrapper) {
		searchWrapper = createSearchWrapper("What did we say about pricing?");
		stageContainer.appendChild(searchWrapper);
		lucide.createIcons();
	}

	// Ensure transcript content exists
	let transcriptContent = stageContainer.querySelector(".transcript-content");
	if (!transcriptContent) {
		transcriptContent = document.createElement("div");
		transcriptContent.className = "transcript-content";
		transcriptContent.innerHTML = `
			<p class="transcript-text">
				After reviewing the market analysis, we decided 
				<span class="transcript-highlight">the pricing was set to $5 each month</span>. 
				This aligns with our value proposition and competitive positioning.
			</p>
		`;
		stageContainer.appendChild(transcriptContent);
	}

	// Add decision link if it doesn't exist
	if (!transcriptContent.querySelector(".decision-link")) {
		const linkElement = document.createElement("a");
		linkElement.href = "#";
		linkElement.className = "decision-link";
		linkElement.innerHTML = `
			<span>Go to decision</span>
			<i data-lucide="arrow-right"></i>
		`;
		transcriptContent.appendChild(linkElement);
		lucide.createIcons();
	}
}

// ========== RECORDING CONTAINER RENDERS ==========
function renderActiveRecording(container) {
	const stageContainer = ensureStageContainer(container);

	// Create recording container if it doesn't exist
	if (!stageContainer.querySelector(".recording-container")) {
		const recordingContainer = document.createElement("div");
		recordingContainer.className = "recording-container";
		recordingContainer.innerHTML = `
			<div class="recording-indicator">
				<div class="recording-dot"></div>
				<span class="recording-text">Recording</span>
				<span class="recording-time">00:12</span>
			</div>
		`;
		stageContainer.appendChild(recordingContainer);

		// Animate time counting
		let seconds = 12;
		const timeElement = recordingContainer.querySelector(".recording-time");
		const timeInterval = setInterval(() => {
			seconds++;
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			if (timeElement) {
				timeElement.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
			}
		}, 100);

		setTimeout(() => clearInterval(timeInterval), 1900);
	}
}

function renderWaveform(container) {
	const numBars = 30;
	const stageContainer = ensureStageContainer(container);

	// Remove recording indicator and add waveform
	removeIfExists(stageContainer, ".recording-indicator");

	let recordingContainer = stageContainer.querySelector(".recording-container");
	if (!recordingContainer) {
		recordingContainer = document.createElement("div");
		recordingContainer.className = "recording-container";
		stageContainer.appendChild(recordingContainer);
	}

	if (!recordingContainer.querySelector(".waveform-container")) {
		const waveformContainer = document.createElement("div");
		waveformContainer.className = "waveform-container";

		// Add header
		const header = document.createElement("div");
		header.className = "waveform-header";
		header.innerHTML = `
			<span class="waveform-duration">00:00</span>
			<span class="waveform-duration">46:21</span>
		`;
		waveformContainer.appendChild(header);

		// Add bars
		const barsContainer = document.createElement("div");
		barsContainer.className = "waveform-bars";

		// Generate random waveform bars
		for (let i = 0; i < numBars; i++) {
			const bar = document.createElement("div");
			bar.className = "waveform-bar";
			const height = Math.random() * 60 + 20;
			bar.style.height = `${height}%`;
			bar.style.animationDelay = `${Math.random() * 0.3}s`;
			barsContainer.appendChild(bar);
		}

		waveformContainer.appendChild(barsContainer);
		recordingContainer.appendChild(waveformContainer);
	}
}

function renderTrimmedWaveform(container) {
	const stageContainer = ensureStageContainer(container);

	// Update waveform header times
	const durations = stageContainer.querySelectorAll(".waveform-duration");
	if (durations.length >= 2) {
		durations[0].textContent = "07:12";
		durations[1].textContent = "37:45";
	}

	// Remove animation delays from bars (for trimmed state)
	const bars = stageContainer.querySelectorAll(".waveform-bar");
	bars.forEach((bar) => {
		bar.style.animationDelay = "0s";
	});

	// Add trim handles if they don't exist
	const waveformBars = stageContainer.querySelector(".waveform-bars");
	if (waveformBars && !waveformBars.querySelector(".trim-handle")) {
		const leftHandle = document.createElement("div");
		leftHandle.className = "trim-handle left visible";

		const rightHandle = document.createElement("div");
		rightHandle.className = "trim-handle right visible";

		waveformBars.appendChild(leftHandle);
		waveformBars.appendChild(rightHandle);
	}
}

function renderSummarizeButton(container) {
	const stageContainer = ensureStageContainer(container);

	// Move trim handles to their final positions
	const leftHandle = stageContainer.querySelector(".trim-handle.left");
	const rightHandle = stageContainer.querySelector(".trim-handle.right");
	if (leftHandle) leftHandle.style.left = "15%";
	if (rightHandle) rightHandle.style.right = "20%";

	// Add summarize button if it doesn't exist
	const recordingContainer = stageContainer.querySelector(
		".recording-container"
	);
	if (
		recordingContainer &&
		!recordingContainer.querySelector(".summarize-button")
	) {
		const button = document.createElement("button");
		button.className = "summarize-button";
		button.textContent = "Summarize Recording";
		recordingContainer.appendChild(button);

		// Animate button click after delay
		setTimeout(() => {
			button.classList.add("clicked");
		}, 500);
	}
}

function renderSummary(container) {
	const stageContainer = ensureStageContainer(container);

	// Remove waveform and button, add summary
	let recordingContainer = stageContainer.querySelector(".recording-container");
	if (!recordingContainer) {
		recordingContainer = document.createElement("div");
		recordingContainer.className = "recording-container";
		stageContainer.appendChild(recordingContainer);
	}

	removeIfExists(recordingContainer, ".waveform-container");
	removeIfExists(recordingContainer, ".summarize-button");

	if (!recordingContainer.querySelector(".summary-container")) {
		const summaryContainer = document.createElement("div");
		summaryContainer.className = "summary-container";
		summaryContainer.innerHTML = `
			<div class="summary-header">
				<i data-lucide="sparkles"></i>
				<span>AI Summary</span>
			</div>
			<div class="summary-section">
				<div class="summary-label">Key Actions</div>
				<ul class="summary-list">
					<li>Update dashboard design</li>
					<li>Review Q4 metrics</li>
				</ul>
				<a href="#" class="summary-link">
					<i data-lucide="file-text"></i>
					<span>2 similar notes</span>
				</a>
			</div>
			<div class="summary-section">
				<div class="summary-label">Tasks</div>
				<ul class="summary-list">
					<li>Schedule follow-up meeting</li>
					<li>Share slides with team</li>
				</ul>
				<a href="#" class="summary-link">
					<i data-lucide="github"></i>
					<span>3 similar issues</span>
				</a>
			</div>
			<div class="summary-section">
				<div class="summary-label">Main Topics</div>
				<div class="summary-text">Product roadmap, quarterly goals, team structure</div>
			</div>
		`;
		recordingContainer.appendChild(summaryContainer);
		lucide.createIcons();
	}
}
