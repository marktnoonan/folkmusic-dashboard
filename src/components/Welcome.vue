<template>
  <div class="welcome">
    <h2 v-if="user.username">
      Hi, {{user.username}}.
    </h2>
		<p>
			I'm happy you made it to the demo. Here are some of the things you can do:
		</p>
		<ol>
			<li>
				<h4>Add shows to your tour calendar</h4>
				<p>
					Shows will be saved to your account, but not made public until you create a public URL. If your show is at a venue we already know about, we can pre-fill most of the details. Just start typing the name.
				</p>
			</li>
			<li>
				<h4>Edit venue details or remove venues</h4>
				<p>
					If it's broke, fix it.
				</p>
			</li>
			<li>
				<h4>Add, edit, and remove items from your news ticker</h4>
				<p>
					The news ticker is built to be responsive and sholid always have enough room for your text, even if you write very long headlines. 
				</p>
			</li>
			<li>
				<h4>Create a public link</h4>
				<p>
					You can share this to provide an up-to-date calendar of your events.
				</p>
			</li>
		</ol>
		<p>
			This demo was made with VueJS and Firebase by your ole buddy, <a href="https://twitter.com/marktnoonan">@marktnoonan</a>. You can check out the code on the <a href="https://github.com/marktnoonan/folkmusic-dashboard">GitHub Repo</a>
		</p>
  </div>
</template>

<script>
import UserStore from '../stores/UserStore.js'

export default {
	data() {
		return {
			user: UserStore.state
		}
	}
}
</script>

<style scoped>
.welcome {
	margin: 10px;
}

a {
	font-weight: bold;
}
</style>
