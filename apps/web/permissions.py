from pydoc import classname

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerReadOnly(BasePermission):
    message = "permission denied, you are not Owner"

    # run def before  entry to the view
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user

    def has_object_permission(self, request, view, obj):
        if request.method is SAFE_METHODS:
            return True
        if (obj.id == request.user.id):
            return True
