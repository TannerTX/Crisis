function parseCommand(content, prefix) {
    if (typeof content !== 'string' || !content.startsWith(prefix)) {
        return null;
    }

    const trimmed = content.trim();
    const withoutPrefix = trimmed.slice(prefix.length).trim();

    if (!withoutPrefix) {
        return null;
    }

    const parts = withoutPrefix.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    return { commandName, args };
}

module.exports = { parseCommand };
