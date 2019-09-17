class Song {
	constructor(video, member) {
		this.name = video.title;
		this.id = video.id;
		this.length = parseInt(video.durationSeconds);
		this.member = member;
		this.dispatcher = null;
		this.playing = false;
	}

	get url() {
		return `https://www.youtube.com/watch?v=${this.id}`;
	}

	get username() {
		let name = this.member.user.tag;
		if(this.member.nickname) name = `${this.member.nickname} (${name})`;
		return name;
	}

	get lengthString() {
		return this.timeString(this.length);
	}

	timeLeft(currentTime) {
		return this.timeString(this.length - currentTime);
	}

	timeString(seconds, forceHours = false) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor(seconds % 3600 / 60);
		return `${forceHours || hours >= 1 ? `${hours}:` : ""}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`
	}
}

module.exports = Song;